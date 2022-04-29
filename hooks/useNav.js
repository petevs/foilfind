import { Box, Burger } from "@mantine/core"
import { useState, useEffect } from 'react'
import { useHover } from '@mantine/hooks'

const useNav = () => {



    const Nav = () => {
        return (
            <Box sx={minMenu} ref={ref}>
                <Box sx={burg}>
                    <Burger size='sm' onClick={() => burgerClick()}
                    sx={(theme) => ({
                        backgroundColor: theme.colors.gray[1],
                        })
                    }
                    />
                </Box>
            </Box>
        )
        }

    return {
        Nav,
        fixedNav
    }

}

export default useNav