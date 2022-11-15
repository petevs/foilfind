// next page called Rentals Homepage

import { Container, Paper, Box, Group, UnstyledButton, Text, Divider } from "@mantine/core";
import BasicShell from "../../components/shells/BasicShell";
import { getCollectionWhere } from "../../helpers/firebaseHelpers";
import { IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons";
import { useState } from "react";


export async function getStaticProps() {
    const rawRetailers = await getCollectionWhere('retailers', 'public', '==', true);
    
    // get retailers that offer lessons
    const retailersWithRentals = rawRetailers.filter(retailer => retailer.services.rentals)


    const rentals = JSON.stringify(retailersWithRentals);
  
    //find all the unique brands in retailers
  
    return {
      props: {
        rentals,
      },
    };
  }

export default function RentalsPage(props) {

    const { rentals } = props
    const data  = JSON.parse(rentals)
    const columns = ['name', 'address']

    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);

      if(field === 'distance') {
        setSortedData(data.sort((a, b) => {
          const aDistance = getDistanceBetweenPoints(geo, [a.geo.latitude, a.geo.longitude])
          const bDistance = getDistanceBetweenPoints(geo, [b.geo.latitude, b.geo.longitude])
          return reversed ? bDistance - aDistance : aDistance - bDistance;
        }));
      }
      
      if(field === 'in stock') {
        setSortedData(data.sort((a, b) => {
          const aStock = a.stock ? 1 : 0
          const bStock = b.stock ? 1 : 0
          return reversed ? bStock - aStock : aStock - bStock;
        }));
      }

      setSortedData([...data].sort((a, b) => {
        if (a[field] > b[field]) return reversed ? -1 : 1;
        if (a[field] < b[field]) return reversed ? 1 : -1;
        return 0;
      }));
    };

    console.log(sortedData)

    return (
        <BasicShell>
            <Container size="xl" p='lg'>
                <h1>Rentals</h1>
                <Box
                    sx={(theme)=> ({
                        border: `1px solid ${theme.colors.gray[3]}`,
                    })}
                >
                    <Box p='sm'>
                        <Text>Provider</Text>
                    </Box>
                    <Divider />

                    {
                        sortedData.map((retailer, index) => (
                            <Box key={index}
                            >
                                <Group position='between' p='sm'>
                                    <Box>
                                        <Text size='sm' weight={700}>{retailer.name}</Text>
                                        <Text size='xs' color='dimmed'>{retailer.address}</Text>
                                    </Box>
                                </Group>
                                <Divider />
                            </Box>
                        ))
                    }
                </Box>
            </Container>
        </BasicShell>
    )
}