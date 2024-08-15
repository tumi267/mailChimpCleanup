'use client'
import React, { useState } from 'react'

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
    <div>Delete Audiance

    <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    
    </div>
  )
}

export default DeleteAudiance