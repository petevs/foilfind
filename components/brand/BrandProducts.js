import { Box, Card, Checkbox, Container, Group, Skeleton, Text, TextInput, AspectRatio } from "@mantine/core"
import { Search } from "tabler-icons-react"
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const BrandProducts = ({ brand, products }) => {

    const mobile = useMediaQuery('(max-width: 768px)');

    const { asPath } = useRouter();

    const layout = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '275px 1fr',
        gap: '2rem',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        }
    })

    const categories = [
        { title: 'hydrofoils'},
        { title: 'wings'},
        { title: 'boards'},
        { title: 'harnesses'},
        { title: 'board bags'},
        { title: 'leashes'},
        { title: 'accessories'},
        { title: 'wetsuits'},
    ]

    const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    return (
        <Container size='xl' pt='xl' pb='xl'>
            <Box sx={layout}>
                {
                    !mobile &&
                    <Box>
                        <Text weight={700} size='sm' mb='md'>Availability</Text>
                        <Checkbox
                            label='Online'
                            size='sm'
                            mt='xs'
                        />
                        <Checkbox
                            label='Locally'
                            size='sm'
                            mt='xs'
                        />
                        <Checkbox
                            label='Used'
                            size='sm'
                            mt='xs'
                        />
                        <Text weight={700} size='sm' mb='md' mt='xl'>Categories</Text>
                        <Card withBorder>
                            <Group position='apart'>
                                <Text size='sm'>All Products</Text>
                                <Checkbox size='sm' />
                            </Group>
                            {
                                categories.map((item, index) => (
                                    <Group position='apart' key={index} mt='xs'>
                                        <Text size='sm' transform='capitalize'>{item.title}</Text>
                                        <Checkbox size='sm' />
                                    </Group>
                                ))
                            }
                        </Card>
                    </Box>
                }
                <Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            justifyItems: 'start'
                        }}
                    >
                        <TextInput 
                            icon={<Search size={18} />} 
                            radius='xs'
                            size='sm'
                            variant='filled'
                            placeholder='Search...'
                            sx={{minWidth: '344px'}}
                        />
                    </Box>
                    <Box 
                        mt='xl'           
                        sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '2rem',
                                '@media (max-width: 1024px)': {
                                    gridTemplateColumns: 'repeat(2, 1fr)'
                                }
                            }}
                    >
                        {
                            products.map(((product, index) => (
                                <Link passHref={true} key={index} href={product.path}>
                                    <Box
                                        sx={{
                                            ':hover': {
                                                cursor: 'pointer'
                                            }
                                        }}
                                    >
                                        <AspectRatio ratio={1}
                                        >
                                            <Image 
                                                src={product.images[0]} 
                                                alt={product.title}
                                                layout='fill'
                                                objectFit='cover' 
                                            />
                                        </AspectRatio>
                                        <Text size='xs' color='dimmed' mt='xs'>{brand}</Text>
                                        <Text weight={700}>{product.title}</Text>
                                    </Box>
                                </Link>
                            )))
                        }
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default BrandProducts