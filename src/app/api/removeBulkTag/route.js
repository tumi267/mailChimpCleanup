import md5 from "md5";
import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing')
export async function POST(req){
      // Configure the Mailchimp API using environment variables
      mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    const reqData=await req.json()
    
    try {
        // Fetch the audience data
        const listdata = await fetch(`${process.env.DomainURL}/api/getAudiance`, {
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
        const res = await mailchimp.lists.listSegments(listId, {
          type: "static",  // Static segments represent tags in Mailchimp
        });
        const {email}=reqData
        const body = {
            members_to_remove: [...email]
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

