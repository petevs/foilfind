import { Box, Button, Container } from "@mantine/core"
import RichTextEditor from '../components/RichText'
import { useState } from "react"
import TestContent from "../components/TestContent"
import Footer from "../components/Footer"
import { HeaderTwo } from "../components/HeaderTwo"


const AddPost = () => {

    const [value, onChange] = useState('')

    const handleClick = () => {
        console.log(value)
    }


    return (
        <>
            <HeaderTwo />
            <TestContent />
            {/* <RichTextEditor
                mt='xl' 
                value={value}
                onChange={onChange}
            />
            <Button onClick={handleClick}>Console log</Button> */}
            <Footer />
        </>
    )
}

export default AddPost