import { Box, Burger, Divider, Text, ThemeIcon } from "@mantine/core"
import NavItem from "./NavItem"
import { GrStatusPlaceholder } from "react-icons/gr"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState, useEffect } from 'react'
import { useHover } from "@mantine/hooks"

const Shell = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)
    const { hovered, ref } = useHover()

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

    useEffect(() => {
        if(hovered === true){
            setIsOpen(true)
        }
        if(hovered === false){
            setIsOpen(false)
        }
    }, [hovered])

    return (
        <>
        <Box>
            <Box sx={minMenu} ref={ref}>
                <Burger size='sm' onClick={() => setIsOpen(!isOpen)} />
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
        </>
    )
}

export default Shell