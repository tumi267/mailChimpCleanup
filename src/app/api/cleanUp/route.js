import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');
import md5 from "md5";

export async function POST(req) {
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });

    try {
        // Fetch the list of all members
        const listdata = await fetch(`${process.env.DomainURL}/api/getAllMembers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await listdata.json();

        // Track unique emails and merge tags for duplicates
        const emailTracker = {};

        const uniqueEmails = data.newList.filter((e) => {
            const email = e.member.email_address;

            if (emailTracker[email]) {
                // If email already exists, merge tagName arrays if new tags are present
                emailTracker[email].tagName = [
                    ...emailTracker[email].tagName,
                    ...e.tagName.filter(tag => !emailTracker[email].tagName.includes(tag))
                ];
                return false; // Exclude this item since it's a duplicate
            } else {
                // Track the email and add it to the tracker
                emailTracker[email] = { ...e };
                return true; // Include this item as it's the first occurrence
            }
        }).map(e => emailTracker[e.member.email_address]);

        // Create a new audience
        // has to take in body
        const newAudience = await fetch(`${process.env.DomainURL}/api/createAudiance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await newAudience.json();
        const listId = res.id;

        // Loop through unique emails and update them in Mailchimp
        for (let i = 0; i < uniqueEmails.length; i++) {
            const member = uniqueEmails[i].member;
            const subscriberHash = md5(member.email_address.toLowerCase());

            try {
                // Add or update the subscriber
                const response = await mailchimp.lists.setListMember(listId, subscriberHash, {
                    email_address: member.email_address,
                    status_if_new: "subscribed",
                    status: "subscribed",
                    merge_fields: {
                        FNAME: member.firstName,
                        LNAME: member.lastName
                    }
                });

                // Prepare the tags
                const compareList = data.lists.map(e => {
                    const tags = data.newList.filter(el => el.tagName.includes(e.name));
                    return {
                        members: tags,
                        tags: e.name
                    };
                });

                // Assign tags to the members
                for (const e of compareList) {
                    let res1 = await mailchimp.lists.listSegments(listId, {
                        type: "static",
                    });

                    let tag = res1.segments.find(segment => segment.name === e.tags);

                    if (!tag) {
                        console.log(`Tag "${e.tags}" not found, creating it...`);
                        const newTag = {
                            name: e.tags,
                            static_segment: [],
                        };
                        const createResponse = await mailchimp.lists.createSegment(listId, newTag);
                        tag = createResponse;
                    }

                    const tagId = tag.id;
                    let emailList = e.members.map(y => y.member?.email_address);
                    const body = {
                        members_to_add: [...emailList]
                    };

                    await mailchimp.lists.batchSegmentMembers(body, listId, tagId);
                }

                console.log(`Successfully added/updated subscriber: ${member.email_address}`);
            } catch (error) {
                console.error(`Error adding/updating subscriber: ${member.email_address}`, error);
            }
        }

        // Return a successful response
        return NextResponse.json({ msg: `${uniqueEmails.length} unique emails processed` }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ msg: 'Oops, something went wrong', error: error.message }, { status: 400 });
    }
}
