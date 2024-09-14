'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import styles from './card.module.css'
import getAudience from '@/app/libs/getAudience'
function AddBulk() {
  const [audiance, setAudiance] = useState({
    name: '',
    members: []
  })
 
  const [lists, setLists] = useState([]);
  const [selectedMemberIndex, setSelectedTab] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        // Assuming you want to convert the first sheet to an array of objects
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // Map CSV to structured objects
        const [headers, ...rows] = json
        const members = rows.map(row => {
          const [firstName, lastName, email] = row
          return { firstName, lastName, email }
        })

        // Update the audiance state with the parsed members
        setAudiance((prevAudiance) => ({
          ...prevAudiance,
          members
        }))
      }

      reader.readAsArrayBuffer(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Handle the submission of the form with the audience data
    const res=await fetch('/api/addBulkContact',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(audiance)
    })
    const msg=await res.json()
    alert(msg.msg)
    
  }

  const handleMemberSelection=(index,ele)=>{
    setSelectedTab(index);
    setAudiance({ ...audiance, name: ele.name })
  }
  useEffect(()=>{getAudience(setLists)},[])  
  return (
    <div className={styles.contain}>
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
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
            <div className={styles.box}>
              <p>Drop the files here ...</p> 
              </div>:<div className={styles.box}>
              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
              </div>
          }
        </div>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
      {audiance.members.length>0&&<div>{JSON.stringify(audiance.members)}</div>}
    </div>
  )
}

export default AddBulk

