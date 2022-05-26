import { Breadcrumbs, Container, Text, Anchor, Box, Skeleton, Group, Chips, Chip, Divider, Stack, Spoiler } from "@mantine/core"
import { useRouter } from "next/router"
import { AspectRatio, Star, ThumbUp } from "tabler-icons-react"
import parse from 'html-react-parser'
import Image from "next/image"

const ProductPage = ({ productDetails }) => {

    console.log(productDetails)

    const { asPath } = useRouter()

    let path = asPath.split('/')
    path.shift()
    let currentPath = ''

    const breadcrumbs = path.map((item, index) => {
            
            currentPath += `/${item}`

            return {
                title: item,
                href: currentPath
            }

    })

    breadcrumbs.pop()
    
    const items = breadcrumbs.map((item, index) => (
        <Anchor href={item.href} key={index} transform='capitalize'>
          {item.title}
        </Anchor>
      ));

    return (
        <>
                <Container mt='md' size='xl'>
                    <Breadcrumbs>
                        {items}
                    </Breadcrumbs>
                    <Box
                        pt='xl' pb='xl'
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '375px 1fr',
                            minHeight: '500px',
                            gap: '2rem'
                        }}
                    >
                        <Box sx={{height: '350px', width: '100%', position: 'relative'}}>
                            <Image
                                src={productDetails.images[0]}
                                layout='fill'
                                objectFit='cover'
                            />
                        </Box>
                        <Box>
                            <Text color='dimmed' size='xs' transform='capitalize'>{productDetails.brand}</Text>
                            <Text size='xl' weight={700} transform='capitalize'>{productDetails.title}</Text>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridAutoFlow: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    '& svg': {
                                        fill: '#F5AB23',
                                        stroke: 'none'
                                    }
                                }}
                            >
                                <Star  height='16px' width='16px' />
                                <Star  height='16px' width='16px' />
                                <Star  height='16px' width='16px' />
                                <Star  height='16px' width='16px' />
                                <Star  height='16px' width='16px' />
                                <Text size='xs' color='dimmed' ml='xs'>5.0 (24)</Text>
                            </Box>
                            <Text weight={700} mt='xl'>Brand Description</Text>
                            <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Show less">
                                <Text color='dimmed' size='sm'>{parse(productDetails.description)}.</Text>
                            </Spoiler>
                            <Box mt='xl'>
                                <Chips size='xs'>
                                    <Chip value='chip one'>Tag 1</Chip>
                                    <Chip value='chip one'>Tag 2</Chip>
                                    <Chip value='chip one'>Tag 3</Chip>
                                    <Chip value='chip one'>Tag 4</Chip>
                                    <Chip value='chip one'>Tag 5</Chip>
                                </Chips>
                            </Box>
                            <Text weight={700} mt='xl'>Our Summary Based on Reviews</Text>
                            <Text color='dimmed' size='sm'>{productDetails.summary}</Text>
                            <Text weight={700} size='sm' mt='xl'>Top report features:</Text>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto auto auto',
                                    justifyContent: 'start',
                                    gap: '4rem',
                                    paddingTop: '2rem'
                                }}
                            >
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                            </Box>
                            <Text weight={700} size='sm' mt='xl'>Keypoints:</Text>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto auto auto',
                                    justifyContent: 'start',
                                    gap: '4rem',
                                    paddingTop: '2rem'
                                }}
                            >
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                                <Stack>
                                    <ThumbUp height='50px' width='50px' />
                                    <Text size='sm' color='dimmed'>Feature</Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    </Container>
                    <Divider />
                    <Container size='xl' pt='xs' pb='xs'>
                        <Group>
                            <Text>Retailers</Text>
                            <Text>Reviews</Text>
                        </Group>
                    </Container>
                    <Divider />
                    <Container size='xl' pt='xl' pb='xl'>
                        <Box sx={{minHeight: '500px'}}>
                            More Details here
                        </Box>
                    </Container>
                </>
    )
}

export default ProductPage