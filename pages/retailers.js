import { getCollection } from "../helpers/firebaseHelpers";

export async function getStaticProps() {
  const retailers = await getCollection('retailers');
  return {
    props: {
      retailers,
    },
  };
}



export default function Retailers(props) {

  const { retailers } = props;
  const parsedRetailers = JSON.parse(retailers);

  console.log(parsedRetailers)

  return (
    <div>
      <h1>Retailers</h1>
    </div>
  );
}