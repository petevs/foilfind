import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import EditRetailer from "../../../components/pages/editRetailer/EditRetailer"


export default function EditRetailerPage(){

  //get slug from url
  const router = useRouter()
  const { retailer } = router.query

  return(
    <Container size='xl'>
      I am an edit page for {retailer}
      <EditRetailer />
    </Container>
  )
}