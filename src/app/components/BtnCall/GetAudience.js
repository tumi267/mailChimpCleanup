'use client'

import { useEffect, useState } from "react";

function GetAudience() {
  // State to store the list of audiences
  const [lists, setLists] = useState([]);
  const [members,setmembers]=useState([])
  const getAudience = async () => {
    try {
      // Make a POST request to the API route
      const res = await fetch(`/api/getAudiance`, {
        method: "POST",                       // HTTP method
        headers: {
          "Content-Type": "application/json", // Content type header
        },
        cache: "no-store",                    // Prevents caching of the response
      });

      // Parse the JSON response
      const data = await res.json();

      // Check if the response contains data and lists
      if (data && data.data && data.data.lists) {
        setLists(data.data.lists);
      } else {
        console.error('Unexpected response format:', data);
      }

    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching data:', error);
    }
  };

  const getAudlist=async (e)=>{

    const reqData={stats:e.stats.member_count,id:e.id}
    const res=await fetch('/api/getSingelAudiancemembers',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(reqData)
    })
    const msg=await res.json()
    setmembers(msg.members)
    }
    useEffect(()=>{getAudience()},[])
  return (
    <div>
      
      {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (
            <div key={i} onClick={()=>{getAudlist(e)}}>{e.name}</div>
          ))}
        </div>
      )}
     
      
      <table >
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
        {members.length>0&&<th>Status</th>}
        </tr>
        </thead>
        
        <tbody>
        {members.length>0&&members.map((e,i)=>{return  <tr key={i}>
              <td>{e.full_name}</td>
              <td>{e.email_address}</td>
              <td>{e.status}</td>
              </tr>
            })}
         </tbody>
       </table>  
      </div>
  );
}

export default GetAudience;
