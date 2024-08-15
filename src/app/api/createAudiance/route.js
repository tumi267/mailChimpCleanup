// Import NextResponse from Next.js for handling responses
import { NextResponse } from "next/server";

// Import Mailchimp Marketing API library
const mailchimp = require('@mailchimp/mailchimp_marketing');

// Define the POST function to handle incoming POST requests
export async function POST(req) {
    // Configure the Mailchimp API using environment variables
    mailchimp.setConfig({
        apiKey: process.env.mailChimp,  // Mailchimp API key
        server: process.env.prefix,     // Mailchimp server prefix (e.g., 'us1')
    });

    try {
        // Parse the JSON body from the incoming request
        const data = await req.json();
        // dynamic data passed by call
   
        const{name,company,address1,city,state,zip,country,from_name,from_email,subject}=data 
        // dummie data
        const event = {
            name
          };
          
          const footerContactInfo = {company,address1,city,state,zip,country};
          const campaignDefaults = {from_name,from_email,subject,language: "EN_US"};
        // Make a request to Mailchimp to create a new audience (list)
        const response = await mailchimp.lists.createList({
            name: event.name,                  // Audience name (from event object)
            contact: footerContactInfo,        // Contact info for the audience
            permission_reminder: "You are receiving this email because you signed up for updates.", // Permission reminder
            email_type_option: true,           // Allows recipients to choose HTML or plain-text emails
            campaign_defaults: campaignDefaults, // Default values for campaigns sent to this audience
        });
       
        // Return a success message along with the response data
        return NextResponse.json({ 
            msg: `Successfully created an audience. The audience id is ${response.id}.`,
            id:response.id
        }, { status: 200 });

    } catch (error) {
        // Log any errors to the console
        console.error('Error:', error.response.body.errors);

        // Return an error response with a 500 status code
        return NextResponse.json({ 
            msg: 'POST call failed', 
            error: error.message ,
        }, { status: 500 });
    }
}