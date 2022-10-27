import { Burger, Drawer, Text, Button, Box, Divider } from "@mantine/core"
import Link from "next/link"
import { useState, useContext } from "react"
import { UserContext } from "../../../state/UserContext"
import { useRouter } from "next/router"

const Sidebar = () => {

    const router = useRouter()
    const { user } = useContext(UserContext)

    const style = (theme) => ({
        gridArea: 'burger',
        alignSelf: 'center',
        padding: '.75rem'
    })


    const [open, setOpen] = useState(false)

    return (
        <>
            <Burger 
                size='sm' 
                sx={style}
                opened={open}
                onClick={() => setOpen(!open)}
            />
            <Drawer
                opened={open}
                onClose={() => setOpen(false)}
                padding='lg'
                size='lg'
            >
                {

                !user &&
                <>                
                    <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '1rem', alignItems: 'center', justifyContent: 'start'}} py='lg'>
                        <Button
                            size='sm'
                            radius='xl'
                            variant='subtle'
                            onClick={() => router.push('/sign-in')}
                            color='gray'
                        >
                            Log in
                        </Button>
                        <Button
                            size='sm'
                            radius='xl'
                            variant='light'
                            onClick={() => router.push('/sign-up')}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider />
                </> 
                }
            </Drawer>
        </>
    )

}

export default Sidebar