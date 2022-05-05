import React from 'react';
import { Container, Grid, Image, SimpleGrid, Skeleton, useMantineTheme, Button, Box, Modal, UnstyledButton } from '@mantine/core';
import { BsFillGrid3X2GapFill } from 'react-icons/bs';
import { useState} from 'react';

const PRIMARY_COL_HEIGHT = 400;

export function ImageGrid({images}) {


  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true)

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  const numImages = [1, 2, 3, 4]

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        size='xl'
        overflow='inside'
      >
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
          {
            images.map(item => (
              <Image src={item} radius='xs' />
            ))
          }
        </Box>
      </Modal>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
          <Image onClick={openModal} sx={{cursor: 'pointer'}} src={images[0]} height={PRIMARY_COL_HEIGHT} radius="md" />

        <Grid gutter="md">
          {
            numImages.map( item => (
              <Grid.Col span={6}>
                <Image onClick={openModal} sx={{cursor: 'pointer'}}  src={images[item]} height={SECONDARY_COL_HEIGHT} radius="md" />
              </Grid.Col>
            ))
          }
        </Grid>
      </SimpleGrid>
      <Box sx={{display: 'grid', justifyItems: 'end', marginTop: '-3rem', marginRight: '1rem'}}>
        <Button variant='default' leftIcon={<BsFillGrid3X2GapFill />} onClick={openModal}>Show All Photos</Button>
      </Box>
    </>
  );
}