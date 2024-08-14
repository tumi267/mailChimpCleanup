import { NextResponse } from "next/server";

const mailchimp=require('@mailchimp/mailchimp_marketing')
import md5 from "md5";
export async function POST(req){
// Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    try {
        const listdata=await fetch(`${process.env.DomainURL}/api/getAllMembers`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await listdata.json()

       
    const emailTracker = {};

    const uniqueEmails = data.newList.filter((e) => {
    const email = e.member.email_address;

    if (emailTracker[email]) {
        // If email already exists, merge tagName arrays if new tags are present
        emailTracker[email].tagName = [
            ...emailTracker[email].tagName,
            ...e.tagName.filter(tag => !emailTracker[email].tagName.includes(tag))
        ];
        return false; // Exclude this item since it's a duplicate
    } else {
        // Track the email and add it to the tracker
        emailTracker[email] = { ...e };
        return true; // Include this item as it's the first occurrence
    }
    }).map(e => emailTracker[e.member.email_address]);


const newAudiance=await fetch(`${process.env.DomainURL}/api/createAudiance`,{
    method:'POST',
    headers:{
        'Content-Type':'applicating/json'
    }
})
const res=await newAudiance.json()

for (let i = 0; i < uniqueEmails.length; i++) {
    const member=uniqueEmails[i].member
    
    const subscriberHash = md5(member.email_address.toLowerCase());
    try {
        
        const response = await mailchimp.lists.setListMember(res.id, subscriberHash, {
            email_address: member.email_address,
            status_if_new: "subscribed", // For new members, set status to "subscribed"
            status: "subscribed", // Update the status to "subscribed" for existing members
            merge_fields: {
                FNAME: member.firstName,
                LNAME: member.lastName
            }
        });
        console.log(`Successfully added/updated subscriber: ${member.email_address}`);
    } catch (error) {
        console.error(`Error adding/updating subscriber: ${member.email_address}`, error);
    }
}
    // create new audiance clean up with uniqueEmails
    // bluck add tags

        return NextResponse.json({msg:`${uniqueEmails.length} uniqueEmails`},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg:'opp somthing went wrong'},{status:400})
    }
   
}