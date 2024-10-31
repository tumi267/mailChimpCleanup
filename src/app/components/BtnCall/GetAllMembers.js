'use client'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
function GetAllMembers() {
 // State to store the list of audiences
 const [lists, setLists] = useState([]);
useEffect(()=>{
  const getAllMembers = async () => {
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
  getAllMembers()
},[])
 

 return (
   <div className={styles.contain}>
    <h2>Get All Members</h2> 
     {lists.length > 0 && (
       <table >
        <thead>
        <tr>
        <th className={styles.thead}>name</th>
        <th className={styles.thead}>email</th>
        <th className={styles.thead}>Tags</th>
        </tr>
        </thead>
        <tbody >
         {lists.map((e, i) => (<tr key={i}>
              <td>{e.member.full_name}</td>
              <td>{e.member.email_address}</td>
              <td>{e.member.tags.map((y,j)=>{return <span key={j}>{y.name}</span>})}</td>
              </tr>
              
         ))}
         </tbody>
       </table>
     )}
   </div>
 );

}

export default GetAllMembers