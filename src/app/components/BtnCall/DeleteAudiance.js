'use client'
import React, { useState } from 'react'
import styles from './card.module.css'
function DeleteAudiance() {
    const [name, setName] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/deleteAudiance',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(name)
        })
        const msg=await res.json()
        alert(msg.msg)
      }
  return (
    <div className={styles.contain}>
      <h3>Delete Audiance</h3>
    <br/>
    <form onSubmit={handleSubmit}>
        <input
        className={styles.inputBar}
          type="text"
          placeholder="Name Of Audiance"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <br/>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    
    </div>
  )
}

export default DeleteAudiance