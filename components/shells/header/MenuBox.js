import { ActionIcon, Avatar, Box, Button, Divider, Indicator, Menu, Text, UnstyledButton } from "@mantine/core"
import { NextLink } from "@mantine/next"
import { IconBell, IconHeart, IconLogout } from "@tabler/icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../../state/UserContext"
import { getAuth, signOut } from 'firebase/auth'

const MenuBox = ({ desktop }) => {

    const router = useRouter()
    const { user, userDetails } = useContext(UserContext)

    const logout = async () => {
        const auth = getAuth()
        await signOut(auth)
      }
    

    const style = (theme) => ({
        gridArea: 'menu',
        display: 'grid',
        alignContent: 'center',
        alignItems: 'center',
        gridAutoFlow: 'column',
        gap: '.75rem',
        padding: '1rem',
        '@media (max-width: 1024px)': {
            justifyContent: 'end'
        }
    })


    return (
        <Box sx={style}>
            
                <ActionIcon
                    variant='subtle'
                    radius='xl'
                    onClick={() => router.push('/notifications')}
                >
                    <Indicator showZero={false} size={10} color='red' offset={2}>
                        <IconBell 
                            fill='#495057'
                            color='white'
                            stroke={.5}
                        />
                    </Indicator>
                </ActionIcon>
            <ActionIcon
                variant='subtle'
                radius='xl'
            >
                <IconHeart 
                    fill='#495057'
                    color='white'
                    stroke={.5}
                />
            </ActionIcon>

            {
                user && (
                        <Menu width={200} shadow="md" position='bottom-end' ZIndex={6}>
                            <Menu.Target>
                                <Avatar 
                                    radius='xl'
                                    src={userDetails?.avatar}
                                    size='sm'
                                />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component={NextLink} href='/profile'>
                                    Profile
                                </Menu.Item>
                                <Menu.Item component={NextLink} href='/#'>
                                    Settings
                                </Menu.Item>
                                <Divider />
                                <Menu.Item
                                    icon={<IconLogout size={14} />}
                                >
                                    <UnstyledButton
                                        onClick={() => logout()}
                                        sx={(theme) => ({
                                            fontSize: theme.fontSizes.sm,
                                        })}
                                    >
                                        Sign out
                                    </UnstyledButton>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                )
            }

            {
                (desktop && !user) && 
                <>
                    <Link
                        href='/sign-in'
                        passHref
                    >
                        <Text
                            component='a'    
                            size='sm'
                            weight={500}
                        >
                            Log in
                        </Text>
                    </Link>
                    <Button
                        size='sm'
                        radius='lg'
                        variant='light'
                        onClick={() => router.push('/sign-up')}
                    >
                        Sign up
                    </Button>
                </>
            }
        </Box>
    )
}

export default MenuBox