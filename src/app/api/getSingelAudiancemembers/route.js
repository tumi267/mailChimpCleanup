import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');

export async function POST(req) {
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });

    try {
        const reqData=await req.json()
            const listId = reqData.id;
            const count=reqData.stats
           
            // Fetch all members from the Mailchimp list
            const membersResponse = await mailchimp.lists.getListMembersInfo(listId, {
                count: count, // 
                offset: 0,   // 
            });
            const members = membersResponse.members;

        return NextResponse.json({members}, { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return new NextResponse.json({ msg: 'Oops, something went wrong' }, { status: 400 });
    }
}