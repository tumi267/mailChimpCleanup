'use client'

import { useEffect, useState } from "react"
import styles from './card.module.css'
import getAudlist from "@/app/libs/getAudlist"
function RemoveBulkTag() {
    const [aud,setAud]=useState([])
    const [members,setmembers]=useState([])
    const [memberToRemove,setmemberstoRemove]=useState([])
    const [listId,setListId]=useState('')
    const [tagName,setTagName]=useState('')
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
         
          setAud(data?.lists)
    }
    res()
},[])

const memberArry=(e)=>{

  setmemberstoRemove((prev) => {
    // Check if the object `e` is already in the array
    const isAlreadyInArray = prev.some(member => member.id === e.id);
    

    if (isAlreadyInArray) {
      // Remove the object `e` from the array if it's already there
      return prev.filter(member => member.id !== e.id);
    } else {
      // Add the object `e` to the array if it's not there
      return [...prev, e];
    }
  });
}
const handleRemoveBulkTag=async()=>{

  const res=await fetch('/api/removeBulkTag',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({memberToRemove,listId,tagName})
  })
  const msg=await res.json()
  console.log(msg)
}
  return (
    <div>
      <br/>
      <h3>Remove Bulk Tag</h3>
      <br/>
      <input className={styles.inputBar} type="text" placeholder="tag name" value={tagName} onChange={(e)=>{setTagName(e.target.value)}}/>
        <div className={styles.submenu}>{aud?.map((e,i)=>{
            return <div className={styles.text_picker} key={i}>
                <p className={styles.text_picker_font} onClick={()=>{
                    getAudlist(e,setmembers)
                    setListId(e.id)
                }}>{e.name}</p>
            </div>
        })}
        </div>
        <table className={styles.tables}>
        {members.length>0&&members.map((e,i)=>{
            return <tr key={i}>
              <td>
                <input 
                type="checkbox" 
                id={`member_${i}`} 
                onClick={() => { memberArry(e) }} 
                />
                </td>
                <td>
                <label  htmlFor={`member_${i}`}> 
                {e.full_name} 
                </label>
                </td>
                <td>
                {e.tags.map((y,j)=>{return <span key={j}>{y.name}</span>})}
                </td>
                <br/>
              </tr>
        })}
        </table>
        <button className={styles.btn} onClick={()=>{handleRemoveBulkTag()}}>submit</button>
    </div>
  )
}

export default RemoveBulkTag