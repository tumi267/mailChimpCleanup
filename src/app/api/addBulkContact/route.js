import { NextResponse } from "next/server";
const mailchimp=require('@mailchimp/mailchimp_marketing')
import md5 from "md5";
import dummieData from '../../db/dummieData.json'
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
            'Content-Type':'application/json'
        }
    })
    const {data}=await listdata.json()
    const {lists}=data
    
   
    const listId = lists[1].id;




//     // will be user input
   const subscribingUser = dummieData
//     // const body = await req.json();
    for (let i = 0; i < subscribingUser.length; i++) {
        const subscriberHash = md5(subscribingUser[i].email.toLowerCase());
        try {
            const response = await mailchimp.lists.setListMember(listId, subscriberHash, {
                email_address: subscribingUser[i].email,
                status_if_new: "subscribed", // For new members, set status to "subscribed"
                status: "subscribed", // Update the status to "subscribed" for existing members
                merge_fields: {
                    FNAME: subscribingUser[i].firstName,
                    LNAME: subscribingUser[i].lastName
                }
            });
            console.log(`Successfully added/updated subscriber: ${subscribingUser[i].email}`);
        } catch (error) {
            console.error(`Error adding/updating subscriber: ${subscribingUser[i].email}`, error);
        }
    }
   
    return NextResponse.json({msg:`${subscribingUser.length} added`},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg:'opp somthing went wrong'},{status:400})
    }
}