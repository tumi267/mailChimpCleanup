'use client'
import React, { useState } from 'react'
import styles from './card.module.css'
function Unsubcribe() {
  const [details,setDetails]=useState({
    name:"",
    email: "",
  })
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle the submission of the form with the audience data
    const res=await fetch('/api/unSubcribeAud',{
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
      <h3>unsubcriber member</h3>
      <br/>
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
          type="email"
          placeholder="email of member"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        <br/>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Unsubcribe