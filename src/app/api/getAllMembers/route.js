import { NextResponse } from "next/server";
const mailchimp = require('@mailchimp/mailchimp_marketing');

export async function POST(req) {
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
        const newList=[]
        for(let i=0;i<lists.length;i++){
            const listId = lists[i].id;
            const count=lists[i].stats.member_count
           
            // Fetch all members from the Mailchimp list
            const membersResponse = await mailchimp.lists.getListMembersInfo(listId, {
                count: count, // 
                offset: 0,   // 
            });
            const members = membersResponse.members;
            members.forEach(e => {
                newList.push({member:e,tagName:[lists[i].name]})
            });
            
        }
      
       


        return NextResponse.json({newList,lists }, { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return new NextResponse.json({ msg: 'Oops, something went wrong' }, { status: 400 });
    }
}