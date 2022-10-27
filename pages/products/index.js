import { Container, Card, Box, Skeleton, Text, Button } from "@mantine/core";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import BasicShell from "../../components/shells/BasicShell";
import { getCollection } from "../../helpers/firebaseHelpers";
import { toKebabCase } from "../../helpers/formatters";
import useCheckAdmin from "../../hooks/useCheckAdmin";


//get static props
export async function getStaticProps() {
  // get all products
  const products = await getCollection("products");

  return {
    props: {
      products,
    },
  };

}

export default function ProductsHome(props){


  return (
    <BasicShell>
      <Container>
        <h1>Products Home</h1>
        {
          props.products.map(product => {
            return (
              <ProductCard key={product.id} product={product} />
            )
          }
          )
        }
      </Container>
    </BasicShell>
  )
}