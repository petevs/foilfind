import { getCollection } from "../../../../helpers/firebaseHelpers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import BasicShell from "../../../../components/shells/BasicShell";
import { Container, Button, Box, Title, Paper, Text, Divider, Indicator, TextInput, Avatar, Skeleton, Rating, Modal, Slider, RangeSlider, Checkbox, MultiSelect } from "@mantine/core";
import CategoryContentLayout from "../../../../components/productPage/CategoryContentLayout";
import HideMobileBox from "../../../../components/HideMobileBox";
import CategoryFilters from "../../../../components/productPage/CategoryFilters";
import CategorySort from "../../../../components/productPage/CategorySort";
import ProductKCard from "../../../../components/productPage/ProductKCard";
import useCheckAdmin from "../../../../hooks/useCheckAdmin";
import { IconChevronRight, IconAdjustmentsHorizontal, IconSearch, IconStar, IconStarHalf, IconX } from "@tabler/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RatingsReadOnly from "../../../../components/RatingsReadOnly";
import Image from "next/image";
import MainPage from "../../../../components/productPage/MainPage";

export async function getStaticPaths(){

  const products = await getCollection('products');

  // get all unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const paths = categories.map((category) => ({
    params: { category: category },
  }));

  return {
    paths,
    fallback: false
  }
}

//get static props for products from firebase
export async function getStaticProps({ params }) {

  const q = query(collection(db, 'products'), where('category', '==', params.category));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });
  
  const products = data;

  return {
    props: {
      products,
      category: params.category
    },
  }

}

export default function ProductCategoryPage(props) {

  return (
    <MainPage
      products={props.products}
      category={props.category}
    />
  )
}