import Image from 'next/image'
import styles from './page.module.css'
import BtnCall from './components/BtnCall/BtnCall'
import AddBulk from './components/BtnCall/AddBulk'
import GetAudience from './components/BtnCall/GetAudience'
import CreateAudiance from './components/BtnCall/CreateAudiance'
import DeleteAudiance from './components/BtnCall/DeleteAudiance'
import AddContact from './components/BtnCall/AddContact'
import CheckSub from './components/BtnCall/CheckSub'
import Unsubcribe from './components/BtnCall/Unsubcribe'
import GetAllMembers from './components/BtnCall/GetAllMembers'
import Cleanup from './components/BtnCall/Cleanup'
import TagAudiance from './components/BtnCall/TagAudiance'
import GetTagedAudiance from './components/BtnCall/GetTagedAudiance'
import RemoveTag from './components/BtnCall/RemoveTag'
import RemoveBulkTag from './components/BtnCall/RemoveBulkTag'
import AddbulkTag from './components/BtnCall/AddbulkTag'


export default function Home() {

  return (
    <main className={styles.main}>
    <GetAudience/>
    <hr/>
    <CreateAudiance/>
    <hr/>
    <AddBulk/>
    <hr/>
    <DeleteAudiance/>
    <hr/>
    <AddContact/>
    <hr/>
    <CheckSub/>
    <hr/>
    <Unsubcribe/>
    <hr/>
    <GetAllMembers/>
    <hr/>
    
     <h2>clean up</h2>
     <Cleanup/>
      <h2>tags</h2>
      <TagAudiance/>
      <GetTagedAudiance/>
      <RemoveTag/>
      <RemoveBulkTag/>
      <AddbulkTag/>

    </main>
  )
}

