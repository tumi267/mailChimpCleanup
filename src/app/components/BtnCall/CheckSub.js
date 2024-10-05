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
  const [status,setStatus]=useState('')
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
    <div >
      <h3>Check Subcriber</h3>
      <br/>
<form onSubmit={handleSubmit}>
    {lists.length > 0 && (
        <div className={styles.aud_list}>
          {lists.map((e, i) => (
            <div className={styles.text_picker} key={i} onClick={()=>{getAudlist(e,setmembers)}}><p className={styles.text_picker_font}>{e.name}</p></div>
          ))}
        </div>
      )}
       <table>
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
 
        </tr>
        </thead>
        
        <tbody>
          {/* onclick open status */}
        {members.length>0&&members.map((e,i)=>{return  <tr key={i} onClick={()=>{setStatus(e)}}>
              <td>{e.full_name}</td>
              <td>{e.email_address}</td>
              </tr>
            })}
         </tbody>
       </table>  
        <br/>
      </form>
      {status!=''&&<div className={styles.model} onClick={()=>{setStatus('')}}>
        <div className={styles.innerModel}>
        <table className={styles.table}>
        <thead>
        <tr>
        <th>name</th>
        <th>email</th>
        <th>status</th>
        </tr>
        </thead>
          <tr >
              <td>{status.full_name}</td>
              <td>{status.email_address}</td>
              <td>{status.status}</td>
          </tr>
          </table>
              </div>
        </div>}
    </div>
  )
}

export default CheckSub