'use client'

import { useEffect, useState } from "react"
import styles from './card.module.css'
function TagAudiance() {
    const [details,setDetails]=useState({name:'',email:'',tagName:''})
    const[lists,setLists]=useState([])
    const [selectedMemberIndex, setSelectedTab] = useState(0);
    const[members,setmembers]=useState([])
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle the submission of the form with the audience data
        const res=await fetch('/api/tagAudiance',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(details)
        })
        const msg=await res.json()
        
        alert(msg.msg)
      }

      const getAudience = async () => {
        try {
          // Make a POST request to the API route
          const res = await fetch(`/api/getAudiance`, {
            method: "POST",                       // HTTP method
            headers: {
              "Content-Type": "application/json", // Content type header
            },
            cache: "no-store",                    // Prevents caching of the response
          });
    
          // Parse the JSON response
          const data = await res.json();
    
          // Check if the response contains data and lists
          if (data && data.data && data.data.lists) {
            setLists(data.data.lists);
          } else {
            console.error('Unexpected response format:', data);
          }
    
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      };
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
      // Handle radio button change
      const handleMemberSelection = (index) => {
        setSelectedTab(index);
      };
      useEffect(()=>{
        getAudience()
      },[])
  return (
    <div className={styles.contain}>
      <h3>Tag Audiance</h3>
        <form onSubmit={handleSubmit}>
           
            {lists.map((e, i) => (
            <div key={i} onClick={()=>{getAudlist(e)
              setDetails({...details,name:e.name})
            }}>
              {e.name}
              </div>
          ))}

            {members.length>0&&members.map((e,i)=>{return<div key={i}><label  onClick={()=>{setDetails({...details,email:e.email_address})}}>
              <input
                type="radio"
                checked={selectedMemberIndex === i}
                onChange={() => handleMemberSelection(i)}
            />
            {e.full_name}
            </label>
            </div>
              })}
           
            <input className={styles.inputBar} type="text" value={details.tagName} placeholder="tag name" onChange={(e)=>{setDetails({...details,tagName:e.target.value})}}/>

            <br/>
            <button className={styles.btn} type="submit">submit</button>
        </form>
    </div>
  )
}

export default TagAudiance