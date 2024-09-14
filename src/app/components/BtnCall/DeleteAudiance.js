'use client'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'
import getAudience from '@/app/libs/getAudience';
function DeleteAudiance() {
    const [name, setName] = useState('')
    const [lists, setLists] = useState([]);
    const [selectedMemberIndex, setSelectedTab] = useState(0);
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

      const handleMemberSelection=(index,ele)=>{
        setSelectedTab(index);
        setName(ele.name)
      }
      useEffect(()=>{getAudience(setLists)},[])    
  return (
    <div className={styles.contain}>
      <h3>Delete Audiance</h3>
    <br/>
    <form onSubmit={handleSubmit}>
    {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (<div key={i}><label>
            <input type='radio' value={e.name}
            checked={selectedMemberIndex === i}
            onChange={() => handleMemberSelection(i,e)}/>
            {e.name}
          </label>
          </div>

          ))}
        </div>
      )}

        <br/>
        <br/>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    
    </div>
  )
}

export default DeleteAudiance