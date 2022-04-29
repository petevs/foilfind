import Shell from "../../components/Shell"
import { Text, Box, Card, Group, ThemeIcon } from "@mantine/core"
import { BsShop } from "react-icons/bs"
import { MdOutlineAddShoppingCart } from "react-icons/md"

const Dealers = () => {


    const wrapper = (theme) => ({
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f5f5f5',
        height: '100%'
    })

    const card = (theme) => ({
        width: '346px',
        height: '400px',
        textAlign: 'center',
        padding: theme.spacing.xl,
        display: 'grid',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: '2rem',
        '&:hover': {
            border: `5px solid ${theme.colors.gray[3]}`,
            cursor: 'pointer'
        }
    })

    const headline = (theme ) => ({
        fontSize: '50px',
        fontWeight: 900,
        marginBottom: theme.spacing.xl
    })

    return (
        <>
            <Shell>
                <Box sx={wrapper}>
                    <Text>Locate a Dealer</Text>
                    <Text sx={headline}>
                        Lets get started...
                    </Text>
                    <Group>
                        <Card
                            shadow='xl'
                            radius='md'
                            sx={card}

                        
                        >
                            <BsShop 
                                style={{
                                    height: '120px',
                                    width: '120px'
                                }}
                            />
                            <Box>
                                <Text sx={{fontSize: '24px'}} weight='900'>Physical</Text>
                                <Text>Pick-up in person</Text>
                            </Box>
                        </Card>
                        <Card
                            shadow='xl'
                            radius='md'
                            sx={card}
                        >
                            <MdOutlineAddShoppingCart
                                style={{
                                    height: '120px',
                                    width: '120px',
                                }}
                            />
                            <Box>
                                <Text sx={{fontSize: '24px'}} weight='900'>Online</Text>
                                <Text>Ship to me</Text>
                            </Box>
                        </Card>
                    </Group>
                </Box>
            </Shell>
        </>
    )
}

export default Dealers