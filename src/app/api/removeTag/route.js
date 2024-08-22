import { NextResponse } from "next/server";
const mailchimp=require('@mailchimp/mailchimp_marketing')
const md5=require("md5")
export async function POST(req){
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
    const subscriberHash = md5(reqData.email.toLowerCase());
        const res = await mailchimp.lists.updateListMemberTags(
            listId,
            subscriberHash,
            {
              tags: [
                {
                  name: `${reqData.tagName}`,
                  status: "inactive",
                },
              ],
            })
       
      

        // Return a success response
        return NextResponse.json({ msg: 'Tags removed successfully' }, { status: 200 });
    } catch (error) {
        // Log and return any errors
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Error updating tags', error: error.message }, { status: 500 });
    }
}