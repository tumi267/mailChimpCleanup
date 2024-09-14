const getAudlist=async (e,setmembers)=>{

    const reqData={stats:e.stats.member_count,id:e.id}
    const res=await fetch('/api/getSingelAudiancemembers',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(reqData)
    })
    const msg=await res.json()
    setmembers(msg.members)
    }
export default getAudlist