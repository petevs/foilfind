import { Container, Paper } from "@mantine/core"
import { useRouter } from "next/router"
import EditRetailer from "../../../components/pages/editRetailer/EditRetailer"
import BasicShell from "../../../components/shells/BasicShell"


export default function EditRetailerPage(){

  //get slug from url
  const router = useRouter()
  const { retailer } = router.query

  return(
    <BasicShell>
        <EditRetailer slug={retailer} />
    </BasicShell>
  )
}