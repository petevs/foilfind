import { Burger, Drawer } from "@mantine/core"
import { useState } from "react"

const Sidebar = () => {

    const style = (theme) => ({
        gridArea: 'burger',
        alignSelf: 'center',
        padding: '.75rem'
    })


    const [open, setOpen] = useState(false)

    return (
        <>
            <Burger 
                size='sm' 
                sx={style}
                opened={open}
                onClick={() => setOpen(!open)}
            />
            <Drawer
                opened={open}
                onClose={() => setOpen(false)}
                padding='lg'
                size='lg'
            >
                Menu
            </Drawer>
        </>
    )

}

export default Sidebar