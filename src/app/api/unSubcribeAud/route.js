import { NextResponse } from "next/server";
import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from "md5";

export async function POST(req) {
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    try {
        // Fetch list data from your API
        const listdata = await fetch(`${process.env.DomainURL}/api/getAudiance`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { data } = await listdata.json();
        const { lists } = data;
        const listId = lists[0].id;

        // Extract email from request body (assuming it is sent as JSON)
        
        const email = "itu.matlala4@gmail.com"; // Use a default if no email is provided
        const subscriberHash = md5(email.toLowerCase());

        // Update the subscription status to "unsubscribed"
        const response = await mailchimp.lists.updateListMember(listId, subscriberHash, {
            status: "unsubscribed"
        });

        return NextResponse.json({ msg: `This user's subscription status is ${response.status}.` }, { status: 200 });
    } catch (e) {
        if (e.status === 404) {
            console.error(`This email is not subscribed to this list`, e);
            return NextResponse.json({ msg: 'This email is not subscribed to this list', error: e.response.body.errors }, { status: 404 });
        } else {
            console.error('An error occurred:', e);
            return NextResponse.json({ msg: 'An error occurred'}, { status: 500 });
        }
    }
}
