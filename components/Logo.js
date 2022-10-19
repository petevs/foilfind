import { Box } from "@mantine/core"
import Link from "next/link"
import FoilFindLogo from "./FoilFindLogo"

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
        <FoilFindLogo 
                width='100'
        />
        </Box>
        </Link>
    )
}

export default Logo