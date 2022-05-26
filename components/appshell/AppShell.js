import { Box, Container } from "@mantine/core"
import Footer from "../footer/Footer"
import Header from "../header/Header"

const AppShell = ({ children }) => {

    const style = (theme) => ({
        minHeight: '100vh',
        padding: '2rem 1rem'
    })

    return (
        <Box>        
            <Header />
                { children }
            <Footer />
        </Box>
    )
}

export default AppShell