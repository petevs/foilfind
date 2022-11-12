import { ActionIcon, Box, Button, Container, Group, Modal } from "@mantine/core"
import Image from "next/image"
import { IconChevronLeft, IconLayoutGrid } from "@tabler/icons"
import { useState } from "react"

const PhotoSection = ({product}) => {

  const [opened, setOpened] = useState(false)

  const photoList = () => {
    let stack = []
    product.images.forEach((photo, index) => {
      if(stack.length === 0) {
        stack.push(true)
        return
      }
      if(stack[index - 1] === true) {
        stack.push(false)
        return
      }
      if(stack[index - 1] === false && stack[index - 2] === false) {
        stack.push(true)
        return
      }
      stack.push(false)
    })
    return stack
  }

  return (
    <>
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      size='255%'
      withCloseButton={false}
      padding='0'
      styles={{
        inner: {
          padding: 0,
        }
        }
      }
    >
      <Box
        sx={{minHeight: '100vh'}}
      >
        <Box
          sx={(theme) => ({
            display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between',
          })}
          p='md'
        >
          <ActionIcon
            onClick={() => setOpened(false)}
            color='dark'
            size='md'
            radius='xl'
            shadow='sm'
          >
            <IconChevronLeft size={24} />
          </ActionIcon>
          <Group spacing='sm'>
            <Button variant='default' size='xs'>Share</Button>
            <Button variant='default' size='xs'>Save</Button>
          </Group>
        </Box>
        <Container size='md' p='xl'>
          <Box
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            })}
          >
            {
              product.images.map((image, index) => (
                <Box
                  sx={{
                    position: 'relative', 
                    width: '100%', 
                    height: '300px',
                    gridColumn: photoList()[index] ? '1 / 3' : 'auto',
                  }}
                  key={index}
                >
                  <Image 
                    src={image} 
                    alt={`product.name ${index}`}
                    layout='fill'
                    objectFit='cover'
                    blurDataURL={image}
                    placeholder='blur'
                  />
                </Box>
              ))
            }
          </Box>
        </Container>

      </Box>
    </Modal>
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', height: '300px', gap: '.5rem', margin: '1rem 0',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            }
          }}>
              <Box
                onClick={() => setOpened(true)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  '& :hover': {
                    cursor: 'pointer',
                  }
                }}
              >
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  layout='fill'
                  objectFit='cover'
                  blurDataURL={product.images[0]}
                  placeholder='blur'
                />
              </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem',
              '@media (max-width: 768px)': {
                display: 'none'
              }
            }}>
              {
                product.images.slice(1, 5).map((image, index) => (
                  <Box
                    onClick={() => setOpened(true)}
                    key={image}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      '& :hover': {
                        cursor: 'pointer',
                      }
                    }}
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      layout='fill'
                      objectFit="cover"
                      blurDataURL={image}
                      placeholder='blur'
                    />
                  </Box>
                ))
              }
            </Box>
          </Box>
        <Box sx={{position: 'relative', display: 'grid', justifyContent: 'end', padding: '0 2rem', marginTop: '-4rem', marginBottom: '4rem'}}>
            <Button variant='default'
                size='xs'
                sx={(theme) => ({border: '1px solid', borderColor: theme.colors.gray[7]})}
                leftIcon={<IconLayoutGrid size={14} />}
                onClick={() => setOpened(true)}
            >Show All Photos</Button>
        </Box>
    </>
  )
}

export default PhotoSection