import { Text, Box, ThemeIcon, Button, Menu, Divider, Modal, TextInput, PasswordInput } from "@mantine/core"
import { GiHamburgerMenu } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa"
import Logo from "./Logo"
import UserContext from "../state/UserContext"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import AuthForm from "./AuthForm"

const Header = ({fixedNav}) => {

    const { user, username } = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)
   
    const router = useRouter()

    const signOutNow = () => {
        signOut(auth)
        router.reload()
    }


    const style = (theme) => ({
        position: 'fixed',
        left: fixedNav ? '240px' : '70px',
        padding: theme.spacing.sm,
        width: fixedNav ? 'calc(100vw - 240px)' : 'calc(100vw - 70px)',
        height: '62px',
        borderBottom: `1px solid ${theme.colors.dark[0]}`,

    })

    const innerStyle = (theme) => ({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
    })

    return (
        <>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                size='md'
                transition='slide-up'
            >
                <AuthForm />
            </Modal>

            <Box sx={style}>
                <Box sx={innerStyle}>
                    <Logo />
                    <Box sx={{display: 'grid', justifyItems: 'end'}}>
                    {/* <Button variant="subtle" color="dark" radius="xl">Post an Opportunity</Button> */}
                    <Menu
                        control={
                            <Button 
                                leftIcon={<GiHamburgerMenu />}
                                variant="outline" 
                                color="gray" 
                                radius="xl"
                                sx={{paddingRight: '4px'}}
                            >
                                <FaUserCircle style={{height: '26px', width: '26px'}}/>
                            </Button>
                        }
                    >
                        <Menu.Item onClick={() => setIsOpen(true)}>Sign Up</Menu.Item>
                        <Menu.Item>Login</Menu.Item>
                        <Divider />
                        <Menu.Item>Post an Opportunity</Menu.Item>
                        <Menu.Item>Promote a Service</Menu.Item>
                        <Menu.Item>Help</Menu.Item>
                    </Menu>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Header