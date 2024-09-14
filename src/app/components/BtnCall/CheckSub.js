'use client'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
import getAudience from '../../libs/getAudience'
import getAudlist from '@/app/libs/getAudlist'
function CheckSub() {
  const [details,setDetails]=useState({
    name:"",
    email: "",
  })
      // State to store the list of audiences
  const [lists, setLists] = useState([]);
  const [members,setmembers]=useState([])
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle the submission of the form with the audience data
    const res=await fetch('/api/checkSubcriber',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(details)
    })
    const msg=await res.json()
    alert(msg.msg)
  }

      useEffect(()=>{getAudience(setLists)},[])
  return (
    <div className={styles.contain}>
      <h3>Check Subcriber</h3>
      <br/>
<form onSubmit={handleSubmit}>
    {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (
            <div key={i} onClick={()=>{getAudlist(e,setmembers)}}>{e.name}</div>
          ))}
        </div>
      )}
       <table >
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
        {members.length>0&&<th>status</th>}
        </tr>
        </thead>
        
        <tbody>
          {/* onclick open status */}
        {members.length>0&&members.map((e,i)=>{return  <tr key={i}>
              <td>{e.full_name}</td>
              <td>{e.email_address}</td>
              <td>{e.status}</td>
              </tr>
            })}
         </tbody>
       </table>  

        <br/>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CheckSub