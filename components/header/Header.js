import { Box, Text, TextInput, Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Links from './Links'
import Logo from './Logo'
import MenuBox from './MenuBox'
import SearchBox from './SearchBox'
import { SearchInput } from './SearchInput'
import Sidebar from './Sidebar'

const Header = () => {

    const desktop = useMediaQuery('(min-width: 1024px)');

    const style = (theme) => ({
        // height: '100px',
        display: 'grid',
        gap: '.75rem / 0',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: '1fr auto',
        gridTemplateAreas: `
            "logo search menu"
            "logo links links"
        `,
        '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr 2fr 1fr',
            gridTemplateRows: 'auto auto auto',
            gridTemplateAreas: `
                "burger logo menu"
                "search search search"
                "links links links"
            `,
            gap: '0',
            height: 'auto',
            alignContent: 'start'
        }
    })

    return (
        <Box sx={(theme) => ({borderBottom: `1px solid ${theme.colors.gray[3]}`})}>
            <Container size='xl'>
                <Box sx={style}>
                    {
                        !desktop &&
                        <Sidebar />
                    }
                    <Logo />
                    <SearchBox />
                    <MenuBox 
                        desktop={desktop}
                    />
                    <Links />
                </Box>
            </Container>
        </Box>
    )
}

export default Header