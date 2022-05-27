import { Box } from "@mantine/core"
import Footer from "../footer/Footer"
import Header from "../header/Header"

const AppShell = ({ children }) => {

    return (
        <Box>        
            <Header />
                { children }
            <Footer />
        </Box>
    )
}

export default AppShell