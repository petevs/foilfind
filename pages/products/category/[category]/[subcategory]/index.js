import { getCollection, getCollectionWhere } from "../../../../../helpers/firebaseHelpers";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../../../../firebase'
import MainPage from "../../../../../components/productPage/MainPage";

export async function getStaticPaths(){

  const paths = [
    { params: { category: 'foils', subcategory: 'masts' } },
    { params: { category: 'foils', subcategory: 'front wings' } },
    { params: { category: 'foils', subcategory: 'tail wings' } },
    { params: { category: 'foils', subcategory: 'foil kits' } },
    { params: { category: 'foils', subcategory: 'fuselages' } },
    { params: { category: 'foils', subcategory: 'accessories' } },
    { params: { category: 'foils', subcategory: 'hardware' } },
    { params: { category: 'boards', subcategory: 'inflatable' } },
    { params: { category: 'boards', subcategory: 'hard boards' } },
  ];

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  const q = query(collection(db, 'products'), where('subCategory', '==', params.subcategory));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });
  
  const products = data;

  return {
    props: {
      products,
      category: params.category,
      subcategory: params.subcategory
    }
  }
}

export default function Subcategory(props) {

  return (
    <MainPage
      products={props.products}
      category={props.category}
      subcategory={props.subcategory}
    />
  );
}