import Image from "next/image"
import styles from './Herolanding.module.css'
function HeroLaning() {
  return (
    <div className={styles.contain}>
      <Image src='/Untitled_design-removebg-preview.png' fill={true} alt="hero image"/>
    </div>
  )
}

export default HeroLaning