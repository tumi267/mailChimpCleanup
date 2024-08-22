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

        const response=await mailchimp.lists.getAllLists();
        // Return a success message along with the response data
        return NextResponse.json({ 
            // msg: `Successfully created an audience. The audience id is ${response}.`, 
            data: response 
        }, { status: 200 });

    } catch (error) {
        // Log any errors to the console
        console.error('Error:', error);

        // Return an error response with a 500 status code
        return NextResponse.json({ 
            msg: 'POST call failed', 
            error: error.message 
        }, { status: 500 });
    }
}