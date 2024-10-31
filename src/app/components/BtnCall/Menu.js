'use client'
import React, { useRef } from 'react'
import styles from './card.module.css'
import { useScroll, motion, useMotionValueEvent, useMotionValue } from "framer-motion"
function Menu({prop}) {
  const ref = useRef(null)
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    })
    const opacity = useMotionValue(1)
    const translateY = useMotionValue(0)

    const getRefPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        return rect.top // Distance from the top of the viewport
      }
      return null
    }
    useMotionValueEvent(scrollY, "change", (latest) => {
      
      if(latest> scrollY.getPrevious()){
      //  scroll up
      if(getRefPosition() == 0){
        opacity.set(0)
        translateY.set(-100)
      }
      }else{
        // scroll down
      opacity.set(1)
      translateY.set(0)
      }
    })

  return (
    <motion.div 
    ref={ref} 
    className={styles.menu_contain} 
    style={{ opacity, y: translateY }}
    transition={{ ease: "easeIn", duration: 0.75 }}>
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
    </motion.div>
  )
}

export default Menu