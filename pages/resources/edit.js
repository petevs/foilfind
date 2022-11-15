import BasicShell from "../../components/shells/BasicShell";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import ResourcesForm from "../../components/pages/resources/ResourcesForm";
import { getCollection, getDocument } from "../../helpers/firebaseHelpers";


export async function getServerSideProps(context) {
  const products = await getCollection('products')
  const retailers = await getCollection('retailers')
  const resource = await getDocument('resources', context.query.rid)
  return {
      props: {
          products,
          retailers,
          resource
      }
  }
}

export default function EditResourcePage(props) {
  
    return (
      <BasicShell>
        <Container size='xl' p='lg'>
          <h1>{props.resource ? 'Edit Resource' : 'Add Resource'}</h1>
          <ResourcesForm 
              {...props}
          />
        </Container>
      </BasicShell>
    )
  }