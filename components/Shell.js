import { Box, Burger, Divider, Text, ThemeIcon } from "@mantine/core"
import NavItem from "./NavItem"
import { GrStatusPlaceholder } from "react-icons/gr"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from 'react'

const Shell = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)

    const minMenu = (theme) => ({
        // display: 'grid',
        // justifyItems: 'center',
        // justifyContent: 'center',
        // alignContent: 'start',
        width: isOpen ? '240px' : '69px',
        height: '100vh',
        padding: theme.spacing.sm,
        borderRight: `1px solid #ced4da`,
        color: theme.colors.dark[5],
        boxShadow: 'rgb(23 35 44 / 10%) 0 5px 15px 0'
    })

    return (
        <>
        <Box>
            <Box sx={minMenu}>
                <Burger size='sm' onClick={() => setIsOpen(!isOpen)} />
                <Divider mt='sm' mb='sm' />
                <ThemeIcon size='sm' variant='outline'>
                    <GrStatusPlaceholder />
                </ThemeIcon>
                {/* <NavItem 
                    title='Foils'
                    path='/foils'
                    icon={<GrStatusPlaceholder />}

                />
                <NavItem 
                    title='Wings'
                    path='/foils'
                    icon={<GrStatusPlaceholder />}

                />
                <NavItem 
                    title='Boards'
                    path='/foils'
                    icon={<GrStatusPlaceholder />}

                />
                <NavItem 
                    title='Accessories'
                    path='/foils'
                    icon={<GrStatusPlaceholder />}

                /> */}
                <Divider mt='sm' mb='sm' />
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
        </>
    )
}

export default Shell