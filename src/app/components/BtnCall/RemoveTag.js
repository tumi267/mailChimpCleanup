'use client'

import { useEffect, useState } from "react"
import styles from './card.module.css'
import getAudience from "@/app/libs/getAudience"
import getAudlist from "@/app/libs/getAudlist"
function RemoveTag() {
    const [details,setDetails]=useState({name:'',email:'',tagName:''})
    const [lists, setLists] = useState([]);
    const [members,setmembers]=useState([])
    const [selectedMemberIndex, setSelectedTab] = useState(0);
    useEffect(()=>{
      getAudience(setLists)
    },[])
    const handleMemberSelection=(index,ele)=>{
      setSelectedTab(index);
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/removeTag',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
        alert(msg.msg)
      }

  return (
    <div className={styles.contain}>
      <br/>
      <h3>Remove Tag</h3> 
      <br/>
      <hr/>
      <div className={styles.aud_list}>
      {lists.map((e,i)=>{return <div className={styles.text_picker} key={i} onClick={()=>{getAudlist(e,setmembers), setDetails({...details,name:e.name})}}><p className={styles.text_picker_font}>{e.name}</p></div>})}
      </div>
      <input className={styles.inputBar} type="text" value={details.tagName} placeholder="tag name" onChange={(e)=>{setDetails({...details,tagName:e.target.value})}}/> 
      <table >
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
        {members.length>0&&<th>tags</th>}
        </tr>
        </thead>
        <tbody>
        {members.length>0&&members.map((e,i)=>{return <tr key={i} onClick={()=>{setDetails({...details,email:e.email_address})}}>
        <td>
        <input type='radio' value={e.full_name}
        checked={selectedMemberIndex === i}
        onChange={() => handleMemberSelection(i,e)}/>
        {e.full_name}</td>
        <td>{e.email_address}</td>
        <td>{e?.tags.map((j,y)=>{return <p key={y}>{j.name}</p>})}</td>
        </tr>
        })}
         </tbody>
       </table>  
       <button className={styles.btn} onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default RemoveTag