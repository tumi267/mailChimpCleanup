import { NextResponse } from "next/server";

const mailchimp=require('@mailchimp/mailchimp_marketing')
import md5 from "md5";
export async function POST(req){
// Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    const reqData=await req.json()
    const {name,firstName,lastName,email,email_from,}=reqData
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
        const truelist=lists.filter((e)=>{return e.name==name})
        if (truelist.length === 0) {
            // Handle the case where the audience does not exist
            
            return NextResponse.json({ msg: 'Audience does not exist.' }, { status: 404 });
        }
        
        const listId=truelist[0].id
        // will be user input
       const subscribingUser = {firstName,lastName,email};

        const subscriberHash = md5(email_from.toLowerCase());

        const response = await mailchimp.lists.setListMember(listId,subscriberHash ,{
            email_address: subscribingUser.email,
            status_if_new: "subscribed", // For new members, set status to "subscribed"
            status: "subscribed", // Update the status to "subscribed" for existing members
            merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
            }
        });
        
        return NextResponse.json({msg:`Successfully added contact as an audience member. The contact's id is ${response.id}.`},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg:'opp somthing went wrong'},{status:400})
    }
}