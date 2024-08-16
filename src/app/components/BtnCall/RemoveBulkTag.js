'use client'

import { useEffect, useState } from "react"

function RemoveBulkTag() {
    const [aud,setAud]=useState([])
    const [members,setmembers]=useState([])
useEffect(()=>{
    const res=async()=>{
        const res=await fetch(`/api/getAudiance`, {
            method: "POST",                       // HTTP method
            headers: {
              "Content-Type": "application/json", // Content type header
            },
            cache: "no-store",                    // Prevents caching of the response
          });

          const {data}=await res.json()
          setAud(data.lists)
    }
    res()
},[])
const getAudlist=async (e)=>{

const reqData={stats:e.stats.member_count,id:e.id}
const res=await fetch('/api/getSingelAudiancemembers',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(reqData)
})
const msg=await res.json()
setmembers(msg.members)
}
  return (
    <div>Remove Bulk Tag
        {aud.map((e,i)=>{
            return <div key={i}>
                <p onClick={()=>{
                    getAudlist(e)
                }}>{e.name}</p>
            </div>
        })}
        {members.length>0&&members.map((e,i)=>{
            return <div key={i}>
                {e.full_name}
                {e.email_address}
            </div>
        })}
    </div>
  )
}

export default RemoveBulkTag