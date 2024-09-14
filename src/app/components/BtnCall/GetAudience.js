'use client'

import getAudience from "@/app/libs/getAudience";
import getAudlist from "@/app/libs/getAudlist";
import { useEffect, useState } from "react";

function GetAudience() {
  // State to store the list of audiences
  const [lists, setLists] = useState([]);
  const [members,setmembers]=useState([])

  useEffect(()=>{getAudience(setLists)},[])
  return (
    <div>
      
      {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (
            <div key={i} onClick={()=>{getAudlist(e,setmembers)}}>{e.name}</div>
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
