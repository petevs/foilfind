import { Card, Text, Box, Divider, Chip, Button, Title, Container } from "@mantine/core";
import { getCollection } from "../../helpers/firebaseHelpers";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconExternalLink, IconLink } from "@tabler/icons";
import Head from "next/head";
import BasicShell from "../../components/shells/BasicShell";
import { useRouter } from "next/router";
import { createSlug} from "../../helpers/formatters";
import BrandTable from "../../components/table/BrandTable";

//get static props for brands from firebase
export async function getStaticProps() {
  const brands = await getCollection('brands');
  return {
    props: {
      brands,
    },
  };
}

export default function Brands(props) {

  const { brands } = props;

  return (
    <BasicShell>
      <Head>
        <title>Find Wing Foil Brands - Search and filter through all the wing foil brands</title>
        <meta name="title" content="Find Wing Foil Brands - Search and filter through all the wing foil brands" />
        <meta name="description" content="Search and filter through all the wing foiling brands with your criteria." />


        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://foilfind.com/brands" />
        <meta property="og:title" content="Find Wing Foil Brands - Search and filter through all the wing foil brands" />
        <meta property="og:description" content="Search and filter through all the wing foiling brands with your criteria." />
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Find Wing Foil Brands - Search and filter through all the wing foil brands" />
        <meta property="twitter:description" content="Search and filter through all the wing foiling brands with your criteria." />
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
      </Head>
      <Box sx={(theme) => ({minHeight: `calc(100vh - ${theme.other.headerHeight}px)`})}>
        <BrandTable
          brands={brands}
        />
      </Box>
    </BasicShell>
  )
}