import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');
import md5 from "md5";
import dummieData from '../../db/dummieData.json';

export async function POST(req) {
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    const reqData=await req.json()
   
    try {
        // Fetch the audience data
        const dev = process.env.NODE_ENV !== 'production';
        const baseurl = dev ? 'http://localhost:3000' : 'https://mail-chimp-cleanup2024.vercel.app';
        const listdata = await fetch(`${baseurl}/api/getAudiance`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { data } = await listdata.json();
        const { lists } = data;
        const truelist=lists.filter((e)=>{return e.name==reqData.name})

        if (truelist.length === 0) {
            // Handle the case where the audience does not exist
            return NextResponse.json({ msg: 'Audience does not exist.' }, { status: 404 });
        }
        
        const listId=truelist[0].id
        // Prepare the members data in batch format
        const members = reqData.members.map(user => ({
            email_address: user.email,
            status_if_new: "subscribed",
            status: "subscribed",
            merge_fields: {
                FNAME: user.firstName,
                LNAME: user.lastName
            }
        }));

        // Batch subscribe or update members in one shot
        const response = await mailchimp.lists.batchListMembers(listId, {
            members,
            update_existing: true // Update existing members if they already exist
        });

        return NextResponse.json({
            msg: `Successfully processed ${response.total_created} new and ${response.total_updated} existing subscribers.`
        }, { status: 200 });

    } catch (error) {
        console.error("Error processing subscribers:", error);
        return NextResponse.json({ msg: 'Oops, something went wrong', error: error.message }, { status: 400 });
    }
}
