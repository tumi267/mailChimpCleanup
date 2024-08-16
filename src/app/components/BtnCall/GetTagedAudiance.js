'use client'

import { useState } from "react"

function GetTagedAudiance() {
    const [details,setDetails]=useState({name:'',email:''})
    const [tagData,setTagData]=useState({tags:[],total_items:0})
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/getTagedAudiance',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
        setTagData(msg?.res)

      }
  return (
    <div>Get Taged Audiance

        <form onSubmit={handleSubmit}>
            <input type="text" value={details.name} placeholder="audiance name" onChange={(e)=>{setDetails({...details,name:e.target.value})}}/>
            <input type="email" value={details.email} placeholder="email" onChange={(e)=>{setDetails({...details,email:e.target.value})}}/>
            <button type="submit">submit</button>
        </form>
        {tagData?.tags.length>0&&<div >
            <h3>total tags</h3>
            {tagData.tags.map((e,i)=>{return <div key={i}>
                <p>id &nbsp;-&nbsp;{e.id}</p>
                <p>name &nbsp;-&nbsp;{e.name}</p>
                <p>date added &nbsp;-&nbsp;{e.date_added}</p>
            </div>})}
        </div>}
    </div>
  )
}

export default GetTagedAudiance