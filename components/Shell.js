import { Box, Burger, Divider, ScrollArea, Text, ThemeIcon } from "@mantine/core"
import NavItem from "./NavItem"
import { GrStatusPlaceholder } from "react-icons/gr"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState, useEffect } from 'react'
import { useHover } from "@mantine/hooks"
import Header from "./Header"
import { FaHotel } from "react-icons/fa"
import NavContent from "./NavContent"

const Shell = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [fixedNav, setFixedNav] = useState(false)
    const { hovered, ref } = useHover()

    const wrapper = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr',
    })

    const minMenu = (theme) => ({
        position: 'fixed',
        top: '0',
        left: '0',
        width: isOpen ? '240px' : '64px',
        height: '100vh',
        padding: theme.spacing.sm,
        borderRight: `1px solid #ced4da`,
        color: theme.colors.dark[5],
        boxShadow: (fixedNav || isOpen === false) ? 'none' : 'rgb(23 35 44 / 10%) 0 5px 15px 0',
        zIndex: 999,
        backgroundColor: 'white',
    })

    const burg = {
        height: '62px',
        display: 'grid',
        gridTemplateColumns: '40px 1fr',
    }


    useEffect(() => {
        if(fixedNav === true){
            setIsOpen(true)
            return
        }
        if(hovered === true){
            setIsOpen(true)
        }
        if(hovered === false){
            setIsOpen(false)
        }
    }, [hovered])

    const burgerClick = () => {
        setFixedNav(!fixedNav)
        if(isOpen === true){
            return
        }
        setIsOpen(false)
    }

    return (
        <>
        <Box sx={wrapper}>
            <ScrollArea sx={minMenu} ref={ref}>
                <Box sx={burg}>
                    <Box
                        sx={{
                            display: 'grid',
                            justifyItems: 'center',
                        }}
                    >
                        <Burger 
                            size='sm' 
                            onClick={() => burgerClick()}
                            sx={(theme) => ({
                                backgroundColor: theme.colors.gray[1],
                                })
                            }
                        />
                    </Box>
                    <Box>
                    </Box>
                </Box>
                <NavContent
                    isOpen={isOpen}
                />
            </ScrollArea>
            <Header 
                fixedNav={fixedNav}
            />
            <Box>
                {children}
            </Box>
        </Box>
        </>
    )
}

export default Shell