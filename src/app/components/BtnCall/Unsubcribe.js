'use client'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
import getAudience from '@/app/libs/getAudience'
import getAudlist from '@/app/libs/getAudlist'
function Unsubcribe() {
  const [details,setDetails]=useState({
    name:"",
    email: "",
  })
  const [members,setmembers]=useState([])
  const [lists,setLists]=useState([])
  const [status,setStatus]=useState(false)
  const [selectedMemberIndex, setSelectedTab] = useState(0);
  // Handle radio button change
  const handleMemberSelection = (index) => {
    setSelectedTab(index);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle the submission of the form with the audience data
    const res=await fetch('/api/unSubcribeAud',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(details)
    })
    const msg=await res.json()
    setStatus(false)
    alert(msg.msg)
  }
  useEffect(()=>{
    getAudience(setLists)
  },[])
  return (
    <div className={styles.contain}>
      <br/>
      <h3>unsubcriber member</h3>
      <br/>
      <div className={styles.aud_list}>
      {lists.map((e,i)=>{return<div className={styles.text_picker} key={i} onClick={()=>{getAudlist(e,setmembers),setDetails({ ...details, name: e.name })}}>
      <p className={styles.text_picker_font}>
        <input type='radio'checked={selectedMemberIndex === i}
            onChange={() => handleMemberSelection(i)}/> 
            {e.name}</p> 
      </div>})}
      </div>
      <table className={styles.table}>
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
 
        </tr>
        </thead>
        
        <tbody>
          {/* onclick open status */}
        {members.length>0&&members.map((e,i)=>{return  e.status=='subscribed'&&
        <tr className={styles.text_picker} key={i} onClick={()=>{setStatus(true),setDetails({ ...details, email: e.email_address })}}>
              <td>{e.full_name}</td>
              <td>{e.email_address}</td>
              </tr>
            
            })}
         </tbody>
       </table>  
       {status==true&&<div className={styles.model} >
        <div className={styles.innerModel}>
        <p>Are you sure you want to unsubscribe the member?</p>
        <div >
        <button onClick={handleSubmit}>Yes</button>
        <button onClick={()=>{setStatus(false)}}>No</button>
        </div>
        </div>
        </div>}
{/* <form onSubmit={handleSubmit}>
        <input
        className={styles.inputBar}
          type="text"
          placeholder="name of audiacne"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
          <input
          className={styles.inputBar}
          type="email"
          placeholder="email of member"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        <br/>
        <button className={styles.btn} type="submit">Submit</button>
      </form> */}
    </div>
  )
}

export default Unsubcribe