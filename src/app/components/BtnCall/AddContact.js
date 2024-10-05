'use client'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
import getAudience from '@/app/libs/getAudience'
function AddContact() {
  const [details,setDetails]=useState({
    name:"",
    firstName: "",
    lastName: "",
    email: "",
    email_from:""
  })
  const [lists, setLists] = useState([]);
  const [selectedMemberIndex, setSelectedTab] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle the submission of the form with the audience data
    const res=await fetch('/api/addContactsAudiance',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(details)
    })
    const msg=await res.json()
    alert(msg.msg)
  }
  useEffect(()=>{getAudience(setLists)},[])
  const handleMemberSelection=(index,ele)=>{
    setSelectedTab(index);
    setDetails({ ...details, name: ele.name })
  }
  return (
    <div className={styles.contain}>
      
      <h3>Add Contact</h3>

  <form onSubmit={handleSubmit}>
  {lists.length > 0 && (
        <div className={styles.aud_list}>
          {lists.map((e, i) => (<div key={i}><label>
            <input type='radio' value={e.name}
            checked={selectedMemberIndex === i}
            onChange={() => handleMemberSelection(i,e)}/>
            {e.name}
          </label>
          </div>

          ))}
        </div>
      )}

        <input
        className={styles.inputBar}
          type="text"
          placeholder="firstName"
          value={details.firstName}
          onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
        />
          <input
          className={styles.inputBar}
          type="text"
          placeholder="lastName"
          value={details.lastName}
          onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
        />
          <input
          className={styles.inputBar}
          type="email"
          placeholder="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
          <input
          className={styles.inputBar}
          type="email"
          placeholder="email_from"
          value={details.email_from}
          onChange={(e) => setDetails({ ...details, email_from: e.target.value })}
        />
        <br/>
        
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddContact