import md5 from "md5";
import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing')
export async function POST(req){
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    try {
        const response = await fetch(`${process.env.DomainURL}/api/getAudiance`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", // Content type header
            },
        });
        //exchange for dynamic value
        let tagName='MegaInfluencer'
        // Parse the response as JSON
        const data = await response.json();
        const { lists } = data.data;

        // Get email and list ID for the first list
        const email = lists[0].campaign_defaults.from_email;
        const listId = lists[0].id;
        const res = await mailchimp.lists.listSegments(listId, {
          type: "static",  // Static segments represent tags in Mailchimp
        });
        const body = {
            members_to_remove: [email]
          };
        const tag = res.segments.find(segment => segment.name === tagName);
        
        if (tag) {
            let tagId=tag.id
            const response = await mailchimp.lists.batchSegmentMembers(
                body,
                listId,
                tagId
              );
        
        return NextResponse.json({msg:`Successfully untagged ${response.total_removed} contacts`},{status:200})
        } else {
        return NextResponse.json({msg:`Tag "${tagName}" not found`},{status:200})
        }
      } catch (error) {
        console.error("Error retrieving tags:", error);
        return NextResponse.json({msg:error},{status:500});
      }
}