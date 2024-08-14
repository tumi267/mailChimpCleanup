import { NextResponse } from "next/server";
const mailchimp =require('@mailchimp/mailchimp_marketing')
const md5 = require("md5");
export async function POST(req){
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
  try {
    const listdata=await fetch(`${process.env.DomainURL}/api/getAudiance`,{
        method:"POST",
        headers:{
            'Content-Type':'applicatio/json'
        }
    })
    const {data}=await listdata.json()
    const {lists}=data
    const listId = lists[0].id;
    // req.body value
    const email = "itu.matlala4@gmail.com";
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