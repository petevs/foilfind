import { Box, Button, Container, Group, Text, TextInput } from "@mantine/core"
import RichTextEditor from '../components/RichText'
import { useState } from "react"
import Footer from "../components/Footer"
import { HeaderTwo } from "../components/HeaderTwo"
import FoilFindLogo from "../components/FoilFindLogo"
import { db } from '../firebase'
import { doc, addDoc, Timestamp, collection } from 'firebase/firestore'

const AddPost = () => {

    const [value, onChange] = useState('')
    const [title, setTitle] = useState('')
    const [video, setVideo] = useState('')

    const handleClick = () => {
        console.log(value)
    }

    const setArticle = async () => {

        const docRef = await addDoc(collection(db, 'updates'), {
            title: title,
            content: value,
            video: video,
            date: Timestamp.fromDate(new Date())
        })
    }


    return (
        <>
            <Box sx={(theme) => ({borderBottom: `1px solid ${theme.colors.dark[0]}`})}>
                <Container size='xl' p='xs'>
                    <Group position='apart'>
                        <FoilFindLogo width='75' />
                        <Text size='sm' color='dimmed'>Coming Soon</Text>
                    </Group>
                </Container>
            </Box>
            <Container size='xl' p='xl'>
                <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label='Post Title'
                />
                <Text size='sm' mt='md'>Content</Text>
                <RichTextEditor 
                    value={value}
                    onChange={onChange}
                />
                <TextInput
                    label='Video ID'
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                />
                <Button onClick={setArticle} mt='xl'>Add Post</Button>
            </Container>
        </>
    )
}

export default AddPost