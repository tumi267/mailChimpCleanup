import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');

export async function POST(req) {
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });

    try {
        // Fetch the audience data
        const dev = process.env.NODE_ENV !== 'production';
        const baseurl = dev ? 'http://localhost:3000' : 'https://mail-chimp-cleanup2024.vercel.app';
        const response = await fetch(`${baseurl}/api/getAudiance`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", // Content type header
            },
        });

        //req.body for tag name
        // Dynamic tag name
        let tagName = 'MegaInfluencer';

        // Parse the response as JSON
        const data = await response.json();
        const { lists } = data.data;



        // Get the list ID for the first list
        const listId = lists[0].id;
        const email = lists[0].campaign_defaults.from_email;



        
        // Fetch segments (tags) from the list
        let res = await mailchimp.lists.listSegments(listId, {
            type: "static",  // Static segments represent tags in Mailchimp
        });

        // Find the tag by name
        let tag = res.segments.find(segment => segment.name === tagName);

        // If tag doesn't exist, create it
        if (!tag) {
  
            const newTag = {
                name: tagName,
                static_segment: [], // Initially create the tag with no members
            };

            // Create the new tag
            const createResponse = await mailchimp.lists.createSegment(listId, newTag);
            tag = createResponse;
        }

        // Now that we have the tag ID, add members to the tag
        const tagId = tag.id;

        // Define the body with members to add
        // req.body for email list
        const body = {
            members_to_add: [email] // Replace with the actual emails
        };

        // Add members to the tag
        const batchResponse = await mailchimp.lists.batchSegmentMembers(
            body,
            listId,
            tagId
        );

        return NextResponse.json({ msg: `Successfully tagged ${batchResponse.total_added} contacts` }, { status: 200 });
    } catch (error) {
        console.error("Error updating tags:", error);
        return NextResponse.json({ msg: 'Error updating tags', error: error.message,errordetail:error }, { status: 500 });
    }
}
  

  
    
 