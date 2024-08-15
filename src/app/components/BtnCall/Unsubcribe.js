'use client'
import React, { useState } from 'react'

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
    <div>Check Subcriber

<form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name of audiacne"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />

          <input
          type="email"
          placeholder="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Unsubcribe