'use client'
import React, { useState } from 'react'

function GetAllMembers() {
 // State to store the list of audiences
 const [lists, setLists] = useState([]);

 const getAudience = async () => {
   try {
     // Make a POST request to the API route
     const res = await fetch(`/api/getAllMembers`, {
       method: "POST",                       // HTTP method
       headers: {
         "Content-Type": "application/json", // Content type header
       },
       cache: "no-store",                    // Prevents caching of the response
     });

     // Parse the JSON response
     const data = await res.json();

     // Check if the response contains data and lists
     if (data && data.newList) {
       setLists(data.newList);
     } else {
       console.error('Unexpected response format:', data);
     }

   } catch (error) {
     // Log any errors that occur during the fetch
     console.error('Error fetching data:', error);
   }
 };
 const handleSubmit = async (event) => {
   event.preventDefault()
   // Handle the submission of the form with the audience data
   const res=await fetch('/api/addBulkContact',{
     method:'POST',
     headers:{'Content-Type':'application/json'},

   })
   const msg=await res.json()
   console.log(msg)
 }
 return (
   <div>
     <button onClick={getAudience}>Get All Members</button>
     {lists.length > 0 && (
       <div>
         {lists.map((e, i) => (
           <div key={i}><p>{e.member.full_name}&nbsp;-&nbsp;{e.member.email_address}</p></div>
         ))}
       </div>
     )}
   </div>
 );

}

export default GetAllMembers