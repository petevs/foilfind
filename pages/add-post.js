import { Box, Button, Container } from "@mantine/core"
import RichTextEditor from '../components/RichText'
import { useState } from "react"
import TestContent from "../components/TestContent"


const AddPost = () => {

    const [value, onChange] = useState('')

    const handleClick = () => {
        console.log(value)
    }


    return (
        <Container>
            <Box pt='xl'>
                <TestContent />
                <RichTextEditor
                    mt='xl' 
                    value={value}
                    onChange={onChange}
                />
                <Button onClick={handleClick}>Console log</Button>
            </Box>
        </Container>
    )
}

export default AddPost