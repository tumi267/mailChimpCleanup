import { NextResponse } from "next/server";
const mailchimp =require('@mailchimp/mailchimp_marketing')
const md5 = require("md5");
export async function POST(req){
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    const reqData=await req.json()
    const {name,email}=reqData
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
        const truelist=lists.filter((e)=>{return e.name==name})
        if (truelist.length === 0) {
            // Handle the case where the audience does not exist
            
            return NextResponse.json({ msg: 'Audience does not exist.' }, { status: 404 });
        }
        
    const listId=truelist[0].id
    const subscriberHash = md5(email.toLowerCase());
    const response = await mailchimp.lists.getListMember(
      listId,
      subscriberHash
    );

    return NextResponse.json({msg:`This user's subscription status is ${response.status}.`},{status:200});
  } catch (e) {
    if (e.status === 404) {
      console.error(`This email is not subscribed to this list`, e);
      return NextResponse.json({msg:'opps'},{error:e.response.body.errors})
    }
  }


}