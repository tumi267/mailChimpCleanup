'use client'

import { useEffect, useState } from "react"
import styles from './card.module.css'
import getAudience from "@/app/libs/getAudience"
import getAudlist from "@/app/libs/getAudlist"
function GetTagedAudiance() {
    const [details,setDetails]=useState({name:'',email:''})
    const [tagData,setTagData]=useState({tags:[],total_items:0})
    const [lists, setLists] = useState([]);
    const [members,setmembers]=useState([])
    const [selectedMemberIndex, setSelectedTab] = useState(0);
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/getTagedAudiance',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
        if(msg?.res.tags.length==0){
          alert('no data found')
        }else{
          setTagData(msg?.res)
        }
      }
      useEffect(()=>{getAudience(setLists)},[])
      const handleMemberSelection=(index,ele)=>{
        setSelectedTab(index);
      }
  return (
    <div className={styles.contain}>
      <h3>Get Taged Audiance</h3>
      {/* add css logic */}
      add click logic
      {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (
            <div key={i} onClick={()=>{getAudlist(e,setmembers),setDetails({...details,name:e.name})}}>{e.name}</div>
          ))}
        </div>
      )}
       <table >
        <thead>
        <tr>
        {members.length>0&&<th>name</th>}
        {members.length>0&&<th>email</th>}
    
        </tr>
        </thead>
        
        <tbody>
        {members.length>0&&members.map((e,i)=>{return <tr key={i} onClick={()=>{setDetails({...details,email:e.email_address})}}>
        <input type='radio' value={e.full_name}
        checked={selectedMemberIndex === i}
        onChange={() => handleMemberSelection(i,e)}/>
        <td>{e.full_name}</td>
        <td>{e.email_address}</td>
        </tr>
        })}
         </tbody>
       </table>  
        <form onSubmit={handleSubmit}>

            <button className={styles.btn} type="submit">submit</button>
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