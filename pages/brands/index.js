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

  const router = useRouter();

  const [filteredBrands, setFilteredBrands] = useState(brands);

  const [filters, setFilters] = useState({
    foils: false,
    wings: false,
    boards: false
  })

  useEffect(() => {
    const filtered = brands.filter(brand => {
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
  },[filters, brands])


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
      <Box>
        <BrandTable
          data={filteredBrands}
          columns={['brand', 'categories']}
        />
      </Box>

      {/* <Box sx={(theme) => ({
        '@media (max-width: 768px)': {
          position: 'absolute',
          top: `${theme.other.headerHeight}px`,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff'
        }
      }
      )}>
        <Box sx={(theme) => ({padding: `${theme.spacing.md}px`})}>
          <Title order={1}>Brands</Title>
          <Box sx={(theme) => ({display: 'grid', gridAutoFlow: 'column', gap: '.5rem', justifyContent: 'start'})}>
            <Chip
              checked={filters.foils}
              onChange={(e) => { setFilters({...filters, foils: !filters.foils}) }}
            >
              Foils
            </Chip>
            <Chip
              checked={filters.wings}
              onChange={(e) => { setFilters({...filters, wings: !filters.wings}) }}
            >
              Wings
            </Chip>
            <Chip
              checked={filters.boards}
              onChange={(e) => { setFilters({...filters, boards: !filters.boards}) }}
            >
              Boards
            </Chip>
          </Box>
        </Box>
          <Divider />
          <Box sx={(theme) => ({display: 'grid', backgroundColor: theme.colors.gray[2]})}>
            <Box
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                padding: `${theme.spacing.xl}px`,
                minHeight: 'calc(100vh - 200px)',
                alignContent: 'start'
              })}
            >
              {
                filteredBrands.map((brand) => {
                  return (
                    <Card key={brand.id} withBorder radius="md" p="md" shadow='sm'>
                      <Card.Section p='md'>
                        <Text size="md" weight={500}>{brand.brand}</Text>
                        <Text size='xs' transform='uppercase' color='dimmed' weight={500}>{checkOfferings(brand)}</Text>
                      </Card.Section>
                      <Card.Section sx={(theme) => ({
                          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                        })
                      }>
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr'
                          }}
                        >
                          <Button
                            size='xs'
                            variant='subtle'
                            leftIcon={<IconLink size={14} />}
                            onClick={() => { router.push(`/brands/${createSlug(brand.id)}`) }}
                          >Learn More</Button>
                          <Divider orientation='vertical' />
                          <Button
                            onClick={() => {window.open(brand.url, '_blank')}}
                            size='xs'
                            variant='subtle'
                            leftIcon={<IconExternalLink size={14} />}
                            fullWidth
                            disabled={!brand.url}
                            sx={(theme) => ({
                              '&:hover': {
                                color: theme.colors.blue[6],
                              }
                            })
                          }
                          >
                          Website
                        </Button>
                        </Box>
                      </Card.Section>
                    </Card>
                  )
                }
                )
              }
            </Box>
          </Box>
      </Box> */}

    </BasicShell>
  )
}