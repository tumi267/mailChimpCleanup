'use client'

import { useState } from "react"

function Cleanup() {
    const [details,setDetails]=useState({
        name: "",
        company: "",
        address1: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        from_name: "",
        from_email: "",
        subject: "",
        language: "EN_US"
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
      
        // // Handle the submission of the form with the audience data
        const res=await fetch('/api/cleanUp',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
   
        alert(msg.msg)
      }
  return (
    <div>Clean up
 <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="company"
          value={details.company}
          onChange={(e) => setDetails({ ...details, company: e.target.value })}
        />
                <input
          type="text"
          placeholder="address1"
          value={details.address1}
          onChange={(e) => setDetails({ ...details, address1: e.target.value })}
        />
                <input
          type="text"
          placeholder="city"
          value={details.city}
          onChange={(e) => setDetails({ ...details, city: e.target.value })}
        />
                <input
          type="text"
          placeholder="state"
          value={details.state}
          onChange={(e) => setDetails({ ...details, state: e.target.value })}
        />
                <input
          type="text"
          placeholder="zip"
          value={details.zip}
          onChange={(e) => setDetails({ ...details, zip: e.target.value })}
        />
                <input
          type="text"
          placeholder="country"
          value={details.country}
          onChange={(e) => setDetails({ ...details, country: e.target.value })}
        />
                <input
          type="text"
          placeholder="from_name"
          value={details.from_name}
          onChange={(e) => setDetails({ ...details, from_name: e.target.value })}
        />
                <input
          type="email"
          placeholder="from_email"
          value={details.from_email}
          onChange={(e) => setDetails({ ...details, from_email: e.target.value })}
        />
                <input
          type="text"
          placeholder="subject"
          value={details.subject}
          onChange={(e) => setDetails({ ...details, subject: e.target.value })}
        />

        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default Cleanup

