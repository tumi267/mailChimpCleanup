'use client'
import React from 'react'
import styles from './card.module.css'
function Menu({prop}) {

  return (
    <div className={styles.menu_contain}>
        <button className={styles.btn2} onClick={()=>{prop(0)}}>Get Audience</button>
        <button className={styles.btn2} onClick={()=>{prop(1)}}>Create Audiance</button>
        <button className={styles.btn2} onClick={()=>{prop(2)}}>Add Bulk</button>
        <button className={styles.btn2} onClick={()=>{prop(3)}}>Delete Audiance</button>
        <button className={styles.btn2} onClick={()=>{prop(4)}}>Add Contact</button>
        <button className={styles.btn2} onClick={()=>{prop(5)}}>Check Sub</button>
        <button className={styles.btn2} onClick={()=>{prop(6)}}>Unsubcribe member</button>
        <button className={styles.btn2} onClick={()=>{prop(7)}}>Get All Members</button>
        <button className={styles.btn2} onClick={()=>{prop(8)}}>Clean up</button>
        <button className={styles.btn2} onClick={()=>{prop(9)}}>Tag Audiance</button>
        <button className={styles.btn2} onClick={()=>{prop(10)}}>Get Member Tags</button>
        <button className={styles.btn2} onClick={()=>{prop(11)}}>Remove Tag</button>
        <button className={styles.btn2} onClick={()=>{prop(12)}}>Remove Bulk Tag</button>
        <button className={styles.btn2} onClick={()=>{prop(13)}}>Add bulk Tag</button>
    </div>
  )
}

export default Menu