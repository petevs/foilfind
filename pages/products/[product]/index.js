import { Box, Container, Title, Button } from "@mantine/core"
import { query, collection, where, getDocs } from 'firebase/firestore';
import BasicShell from "../../../components/shells/BasicShell";
import { db } from "../../../firebase";
import { getCollection } from "../../../helpers/firebaseHelpers";
import useCheckAdmin from "../../../hooks/useCheckAdmin";
import { useRouter } from "next/router";

// get static paths for each product
export async function getStaticPaths() {
  // get all products
  const products = await getCollection("products");

  // create paths for each product
  const paths = products.map((product) => ({
    params: { product: product.path },
  }));

  return { paths, fallback: false };
}


// get static props for each product

export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('path', '==', params.product));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const product = data[0];

  return {
    props: {
      product,
    },
  }
}


export default function ProductPage(props) {

  const { isAdmin, user } = useCheckAdmin();
  const router = useRouter();

  return (
    <BasicShell>
      <Container size='xl' p='lg'>
        <Title order={1}>{props.product.name}</Title>
        {
          isAdmin && (
            <Button
              onClick={() => router.push(`${router.asPath}/edit`)}
            >Edit</Button>
          )
        }
      </Container>
    </BasicShell>
  )
}