'use client'
import { useState } from "react"
import AddBulk from "./AddBulk"
import AddContact from "./AddContact"
import AddbulkTag from "./AddbulkTag"
import CheckSub from "./CheckSub"
import Cleanup from "./Cleanup"
import CreateAudiance from "./CreateAudiance"
import DeleteAudiance from "./DeleteAudiance"
import GetAllMembers from "./GetAllMembers"
import GetAudience from "./GetAudience"
import GetTagedAudiance from "./GetTagedAudiance"
import RemoveBulkTag from "./RemoveBulkTag"
import RemoveTag from "./RemoveTag"
import TagAudiance from "./TagAudiance"
import Unsubcribe from "./Unsubcribe"
import Menu from "./menu"

function Maincontent() {
  const [rendercontent,setrendercontent]=useState(0)
    return (
    <div>
    <Menu
    prop={setrendercontent}
    />
    {rendercontent==0&&<GetAudience/>}
    {rendercontent==1&&<CreateAudiance/>}
    {rendercontent==2&&<AddBulk/>}
    {rendercontent==3&&<DeleteAudiance/>}
    {rendercontent==4&&<AddContact/>}
    {rendercontent==5&&<CheckSub/>}
    {rendercontent==6&&<Unsubcribe/>}
    {rendercontent==7&&<GetAllMembers/>}
    {rendercontent==8&&<Cleanup/>}
    {rendercontent==9&&<TagAudiance/>}
    {rendercontent==10&&<GetTagedAudiance/>}
    {rendercontent==11&&<RemoveTag/>}
    {rendercontent==12&&<RemoveBulkTag/>}
    {rendercontent==13&&<AddbulkTag/>} 
    </div>
  )
}

export default Maincontent