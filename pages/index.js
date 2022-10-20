import { Card, Text, Box, Divider, Chip, Button, Title } from "@mantine/core";
import { getCollection } from "../helpers/firebaseHelpers";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons";
import Head from "next/head";

//get static props for brands from firebase
export async function getStaticProps() {
  const brands = await getCollection('brands');
  return {
    props: {
      brands,
    },
  };
}

export default function Home(props) {

  const { brands } = props;
  const parsedBrands = JSON.parse(brands);

  const [filteredBrands, setFilteredBrands] = useState(parsedBrands);

  const [filters, setFilters] = useState({
    foils: false,
    wings: false,
    boards: false
  })

  useEffect(() => {
    const filtered = parsedBrands.filter(brand => {
      if (filters.foils && !brand.foils) {
        return false;
      }
      if (filters.wings && !brand.wings) {
        return false;
      }
      if (filters.boards && !brand.boards) {
        return false;
      }
      return true;
    })
    setFilteredBrands(filtered);
  },[filters, parsedBrands])


  const checkOfferings = (brand) => {
    const offerings = []
    if (brand.foils) {
      offerings.push('foils')
    }
    if (brand.wings) {
      offerings.push('wings')
    }
    if (brand.boards) {
      offerings.push('boards')
    }

    //add a · in between each offering
    return offerings.join(' · ')
  }


  return (
    <>
      <Box>
        hello 
      </Box>
    </>
  )
}