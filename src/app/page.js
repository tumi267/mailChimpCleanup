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
    <Cleanup/>
     <h2>clean up</h2>
      <div className={styles.description}>
        <BtnCall
        call='cleanUp'
        name='clean up'
        />
        </div>
      <h2>tags</h2>
    <div className={styles.description}>        
      <BtnCall
      call='tagAudiance'
      name='tag audiance'
      />
      <BtnCall
      call='getTagedAudiance'
      name='get tag audiance'
      />
      <BtnCall
      call='removeTag'
      name='remove tag audiance'
      />
      <BtnCall
      call='removeBulkTag'
      name='remove bulk'/>
      <BtnCall
      call='addbulkTag'
      name='tag bulk'/>
      
      </div>
    </main>
  )
}


  // // State to store footer contact information
  // const [footerContactInfo, setFooterContactInfo] = useState({
  //   company: "Bassmint studios",           // Company name
  //   address1: "405 N Angier Ave NE",        // Address line 1
  //   city: "Atlanta",                        // City
  //   state: "GA",                            // State
  //   zip: "30308",                           // Zip code
  //   country: "US",                          // Country
  // });

  // // State to store default campaign settings
  // const [campaignDefaults, setCampaignDefaults] = useState({
  //   from_name: "Gettin' Together",          // Default 'from' name
  //   from_email: "tumidev267@gmail.com",     // Default 'from' email
  //   subject: "JS Developers Meetup",        // Default email subject
  //   language: "EN_US",                      // Language setting
  // });

  // // State to store event information (used for audience name)
  // const [event, setEvent] = useState({ name: "JS Developers Meetup" });