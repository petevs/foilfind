import React from 'react';
import { Container, Grid, Image, SimpleGrid, Skeleton, useMantineTheme, Button, Box, Modal, UnstyledButton } from '@mantine/core';
import { BsFillGrid3X2GapFill } from 'react-icons/bs';
import { useState} from 'react';

const PRIMARY_COL_HEIGHT = 400;

export function ImageGrid({images}) {


  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true)

  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        size='xl'
        overflow='inside'
        transition='slide-up'
      >
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
          {
            images.map((item, index) => (
              <Image key={index} src={item} radius='xs' sx={{margin: 0}} />
            ))
          }
        </Box>
      </Modal>
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}
      >
          <Image src={images[0]} radius="md" onClick={openModal} sx={{cursor: 'pointer'}} />
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}
        >
          <Image src={images[1]} radius="md" onClick={openModal} sx={{cursor: 'pointer'}} />
          <Image src={images[2]} radius="md" onClick={openModal} sx={{cursor: 'pointer'}} />
          <Image src={images[3]} radius="md" onClick={openModal} sx={{cursor: 'pointer'}} />
          <Image src={images[4]} radius="md" onClick={openModal} sx={{cursor: 'pointer'}} />
        </Box>

      </Box>
      <Box sx={{display: 'grid', justifyItems: 'end', marginTop: '-3rem', marginRight: '1rem'}}>
        <Button variant='default' leftIcon={<BsFillGrid3X2GapFill />} onClick={openModal}>Show All Photos</Button>
      </Box>
    </>
  );
}