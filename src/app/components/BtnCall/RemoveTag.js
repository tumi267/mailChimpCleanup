'use client'

import { useState } from "react"

function RemoveTag() {
    const [details,setDetails]=useState({name:'',email:'',tagName:''})
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
    <div>Remove Tag 
        <form onSubmit={handleSubmit}>
            <input type="text" value={details.name} placeholder="audiance name" onChange={(e)=>{setDetails({...details,name:e.target.value})}}/>

            <input type="text" value={details.tagName} placeholder="tag name" onChange={(e)=>{setDetails({...details,tagName:e.target.value})}}/>

            <input type="email" value={details.email} placeholder="audiance member email" onChange={(e)=>{setDetails({...details,email:e.target.value})}}/>

            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default RemoveTag