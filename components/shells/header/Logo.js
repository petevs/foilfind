import { Box, Text } from "@mantine/core"
import Link from "next/link"
import FoilFindLogo from "../../FoilFindLogo"
import FFLogo from "../../FFLogo"

const Logo = () => {

    return (
        <Link passhref={true} href="/">
            <Box
            sx={{
                gridArea: 'logo',
                display: 'grid',
                alignItems: 'center',
                padding: '1rem',
                ':hover': {
                    cursor: 'pointer'
                },
                '@media (max-width: 1024px)': {
                    display: 'grid',
                    justifyItems: 'center',
                }
            }}
        >
                <FoilFindLogo 
                    width='100'
                />
        </Box>
        </Link>
    )
}

export default Logo