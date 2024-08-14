import { NextResponse } from "next/server";
const mailchimp=require('@mailchimp/mailchimp_marketing')

export async function POST(){
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });
    try {
        const res=await fetch(`${process.env.DomainURL}/api/getAudiance`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json", // Content type header
        }
        })
        const {data}=await res.json()
        const {lists}=data
        //id will be dynamic where client selets a list
        const listId=lists[0].id
        
        const response = await mailchimp.lists.deleteList(listId);
   
        return NextResponse.json({msg:'Audience deleted successfully:', response},{status:200})
      } catch (error) {
        console.error('Error deleting audience:', error);
        return NextResponse.json({msg:'somthing went wrong'},{error},{status:500})
      }
    
}