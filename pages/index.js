import { Card, Text, Box, Divider, Chip, Button, Title, Container, Paper, Center } from "@mantine/core";
import { getCollection } from "../helpers/firebaseHelpers";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons";
import Head from "next/head";
import BasicShell from "../components/shells/BasicShell";
import ContentSlider from "../components/ContentSlider";
import ComingSoon from "../components/ComingSoon";
import Hero from "../components/Hero";


export default function Home(props) {

  const popularBrands = [
    { title: 'Ozone Kites', path: 'ozone-kites' },
    { title: 'Slingshot Sports', path: 'slingshot-sports' },
    { title: 'KT Surfing', path: 'kt-surfing' },
    { title: 'Duotone Sports', path: 'duotone-sports' },
    { title: 'SIC Maui', path: 'sic-maui' },
    { title: 'Ocean Rodeo', path: 'ocean-rodeo' },
    { title: 'Star Board', path: 'star-board' },
    { title: 'Armstrong', path: 'armstrong' },
    { title: 'Core Kiteboarding', path: 'core-kiteboarding' },
    { title: 'North Kiteboarding', path: 'north-kiteboarding' }
  ]


  return (
    // <ComingSoon />
    <BasicShell>
      <Head>
        <title>Find Everything Foil</title>
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
      <Container size='xl' p='xl' sx={(theme) => ({ minHeight: `calc(100vh - ${theme.other.headerHeight}px)`})}>
        <Hero 
          subhead='Everything about foil gear explained'
          head='Find Foil Answers'
          buttonText='Learn More'
          bgImg='https://www.armstrongfoils.com/media/1896/hs-1850-website-header-1-2400x950.jpg?anchor=centermode&mode=crop&width=2200&height=900'
        />
        <ContentSlider
          title='Popular Brands'
          parentPath='/brands'
          cards={popularBrands}
        />
        <ContentSlider
          title='Featured Retailers'
          parentPath='/retailers'
          cards={[
            {
              title: 'Silent Sports',
              path: 'silent-sports'
            },
            {
              title: 'Real Watersports',
              path: 'real-watersports'
            },
            {
              title: 'Wind Spirit',
              path: 'wind-spirit'
            },
            {
              title: 'North Shore Ski & Board',
              path: 'north-shore-ski-&-board'
            }
          ]}
        />
      </Container>
    </BasicShell>
  )
}