import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCollection } from '../../helpers/firebaseHelpers';

// get static paths for all brands
export async function getStaticPaths() {
  const brands = await getCollection('brands');
  const paths = brands.map((brand) => ({
    params: { brand: brand.path },
  }));
  return {
    paths,
    fallback: false,
  };
}

//get static props for brand from firebase
export async function getStaticProps({ params }) {

  const q = query(collection(db, 'brands'), where('path', '==', params.brand));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });

  const brand = data[0];

  return {
    props: {
      brand,
    },
  }
}


export default function BrandPage(props){
  const { brand } = props;
  return (
    <div>
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      <p>{brand.foils ? 'Foils' : ''}</p>
      <p>{brand.wings ? 'Wings' : ''}</p>
      <p>{brand.boards ? 'Boards' : ''}</p>
    </div>
  )
}