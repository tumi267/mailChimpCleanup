import { NextResponse } from "next/server";
const mailchimp=require('@mailchimp/mailchimp_marketing')

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
        const truelist=lists.filter((e)=>{return e.name==reqData})

        if (truelist.length === 0) {
            // Handle the case where the audience does not exist
            return NextResponse.json({ msg: 'Audience does not exist.' }, { status: 404 });
        }
        
        const listId=truelist[0].id
        
        const response = await mailchimp.lists.deleteList(listId);
   
        return NextResponse.json({msg:'Audience deleted successfully:', response},{status:200})
      } catch (error) {
        console.error('Error deleting audience:', error);
        return NextResponse.json({msg:'somthing went wrong'},{error},{status:500})
      }
    
}