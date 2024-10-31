'use client'

import getAudience from "@/app/libs/getAudience";
import getAudlist from "@/app/libs/getAudlist";
import { useEffect, useState } from "react";
import styles from './card.module.css'
function GetAudience() {
  // State to store the list of audiences
  const [lists, setLists] = useState([]);
  const [members,setmembers]=useState([]);
  const [selectedMemberIndex, setSelectedTab] = useState(0);
  // Handle radio button change
  const handleMemberSelection = (index) => {
    setSelectedTab(index);
  };
  useEffect(()=>{getAudience(setLists)},[])
  return (
    <div className={styles.contain}>
      <h2>Get Audience</h2>
      {lists.length > 0 && (
        <div className={styles.aud_list}>
          {lists.map((e, i) => (
            <div className={styles.text_picker} key={i} onClick={()=>{getAudlist(e,setmembers)}}><p className={styles.text_picker_font}>
            <input type="radio"  
            checked={selectedMemberIndex === i}
            onChange={() => handleMemberSelection(i)}/> {e.name}</p></div>
          ))}
        </div>
      )}
     
      
      <table >
        <thead>
        <tr>
     
        {members.length>0&&<th >name</th>}
        {members.length>0&&<th >email</th>}
        {members.length>0&&<th >Status</th>}

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
