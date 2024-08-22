'use client'

import { useState } from "react"
import styles from './card.module.css'
function TagAudiance() {
    const [details,setDetails]=useState({name:'',email:'',tagName:''})
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
  return (
    <div className={styles.contain}>
      <h3>Tag Audiance</h3>
        <form onSubmit={handleSubmit}>
            <input className={styles.inputBar} type="text" value={details.name} placeholder="audiance name" onChange={(e)=>{setDetails({...details,name:e.target.value})}}/>

            <input className={styles.inputBar} type="text" value={details.tagName} placeholder="tag name" onChange={(e)=>{setDetails({...details,tagName:e.target.value})}}/>

            <input className={styles.inputBar} type="email" value={details.email} placeholder="audiance member email" onChange={(e)=>{setDetails({...details,email:e.target.value})}}/>
            <br/>
            <button className={styles.btn} type="submit">submit</button>
        </form>
    </div>
  )
}

export default TagAudiance