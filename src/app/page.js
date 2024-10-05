
import styles from './page.module.css'
import Maincontent from './components/BtnCall/Maincontent'
import HeroLaning from './components/BtnCall/HeroLaning'


export default function Home() {

  return (
    <main className={styles.main}>
    <HeroLaning/>
    <Maincontent/>
    </main>
  )
}

