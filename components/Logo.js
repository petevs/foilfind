import { Box } from "@mantine/core"
import Link from "next/link"
import FoilFindLogo from "./FoilFindLogo"
import FFLogo from "./FFLogo"

const Logo = () => {

    return (
        <Link passhref={true} href="/">
            <Box
            sx={{
                alignSelf: 'center',
                ':hover': {
                    cursor: 'pointer'
                },
                '@media (max-width: 1024px)': {
                    display: 'grid',
                    justifyItems: 'center',
                }
            }}
        >
            <Box
                sx={{
                    '@media (max-width: 1024px)': {
                        display: 'none'
                    }
                }}
            >
                <FoilFindLogo 
                    width='100'
                />
            </Box>
            <Box
                sx={{
                    '@media (min-width: 1024px)': {
                        display: 'none'
                    }
                }}
            >
                <FFLogo
                    width='100'
                />
            </Box>
        </Box>
        </Link>
    )
}

export default Logo