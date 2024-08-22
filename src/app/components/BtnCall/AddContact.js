'use client'
import React, { useState } from 'react'
import styles from './card.module.css'
function AddContact() {
  const [details,setDetails]=useState({
    name:"",
    firstName: "",
    lastName: "",
    email: "",
    email_from:""
  })
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
  return (
    <div className={styles.contain}>
      
      <h3>Add Contact</h3>

  <form onSubmit={handleSubmit}>
        <input
        className={styles.inputBar}
          type="text"
          placeholder="name of audiacne"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
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