'use client'

import { useEffect, useState } from "react"
import styles from './card.module.css'
import getAudlist from "@/app/libs/getAudlist"
import getAudience from "@/app/libs/getAudience"
function TagAudiance() {
    const [details,setDetails]=useState({name:'',email:'',tagName:''})
    const[lists,setLists]=useState([])
    const [selectedMemberIndex, setSelectedTab] = useState(0);
    const[members,setmembers]=useState([])
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/tagAudiance',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
        alert(msg.msg)
      }

      // Handle radio button change
      const handleMemberSelection = (index) => {
        setSelectedTab(index);
      };
      useEffect(()=>{
        getAudience(setLists)
      },[])
  return (
    <div >
      <h3>Tag Audiance Member</h3>
        <form onSubmit={handleSubmit}>
           <div className={styles.aud_list}>
            {lists.map((e, i) => (
            <div className={styles.text_picker}  key={i} onClick={()=>{getAudlist(e,setmembers)
              setDetails({...details,name:e.name})
            }}>
              <p className={styles.text_picker_font}>{e.name}</p>
              </div>
          ))}
          </div>
          <input className={styles.inputBar} type="text" value={details.tagName} placeholder="tag name" onChange={(e)=>{setDetails({...details,tagName:e.target.value})}}/>
            {members.length>0&&members.map((e,i)=>{return e.status=='subscribed'&&<div key={i}><label  onClick={()=>{setDetails({...details,email:e.email_address})}}>
              <input
                type="radio"
                checked={selectedMemberIndex === i}
                onChange={() => handleMemberSelection(i)}
            />
            {e.full_name}-{e.email_address}
           
            </label>
            </div>
              })}
            <br/>
            <button className={styles.btn} type="submit">submit</button>
        </form>
    </div>
  )
}

export default TagAudiance