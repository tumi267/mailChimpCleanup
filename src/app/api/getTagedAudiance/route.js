import { NextResponse } from "next/server";
const mailchimp=require('@mailchimp/mailchimp_marketing')
const md5=require("md5")
export async function POST(req){
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    try {
        // Fetch the audience data from the specified endpoint
        const response = await fetch(`${process.env.DomainURL}/api/getAudiance`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", // Content type header
            },
        });
        
        // Parse the response as JSON
        const data = await response.json();
        const { lists } = data.data;

        // Get email and list ID for the first list
        const email = lists[0].campaign_defaults.from_email;
        const listId = lists[0].id;
        const subscriberHash = md5(email.toLowerCase());

        const res = await mailchimp.lists.getListMemberTags(listId, subscriberHash);
        console.log(res)
       
        // console.log(`Urist has been tagged ${res.total_items} times.`);

        // Return a success response
        return NextResponse.json({ msg: 'Tags updated successfully' }, { status: 200 });
    } catch (error) {
        // Log and return any errors
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Error updating tags', error: error.message }, { status: 500 });
    }
}