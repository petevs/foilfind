import { Box, Button, Center, Container, Text, TextInput, Group,  Divider, AspectRatio, Card,  Modal, ThemeIcon } from "@mantine/core"
import { ThumbUp } from "tabler-icons-react"
import { useState } from 'react'
import { collection, addDoc,  } from 'firebase/firestore'
import { db } from '../firebase'
import parse from 'html-react-parser'
import TempHeader from "./header/TempHeader"


const ComingSoon = ({ posts }) => {


    const style = {
        display: 'grid',
    }

    const [dialogBox, setDialogBox] = useState(false)
    const [email, setEmail] = useState('')


    const handleEmailSubscribe = async () => {
        const docRef = await addDoc(collection(db, 'waitingList'), {
            email: email
        })

        setEmail('')
        setDialogBox(true)
    }


    return (
        <Box>
            <Modal
                opened={dialogBox}
                withCloseButton
                onClose={() => setDialogBox(false)}
                size='lg'
                radius='md'
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center', padding: '2rem'}}>
                    <ThemeIcon size={50} sx={{borderRadius: '50%'}}><ThumbUp /></ThemeIcon>
                    <Text weight={900} size='xl' mt='md'>Thank you for subscribing!</Text>
                    <Text color='dimmed'>We`&apos;`ll let you know when we go live!</Text>
                </Box>
            </Modal>
            <TempHeader />
            <Container sx={style}>
                <Box p='xl' mt='xl' mb='xl'>
                    <Text sx={{fontSize: '2.5rem'}} weight={700} align='center'>Coming Soon</Text>
                    <Text align='center' color='dimmed'>A community connecting wing foiling riders, retailers, coaches, brands and more.</Text>
                    <Center>
                        <Group mt='md'>
                            <TextInput
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button onClick={handleEmailSubscribe}>Notify Me</Button>
                        </Group>
                    </Center>
                </Box>
                <Divider  mb='xl' />
                <Box
                    sx={{
                        overflowY: 'scroll',
                        padding: '1rem'
                    }}
                >
                    <Text weight={900} mb='xl' size='xl'>Latest Updates</Text>
                    {
                        posts &&
                        posts.map((post, index) => (
                            <Card
                                key={index} 
                                withBorder 
                                shadow='lg' 
                                mb='xl' 
                                sx={(theme) => ({
                                    backgroundColor: theme.colors.gray[0]
                                })}
                                p='xl'
                            >
                                <Text weight={700} size='xl'>{post.title}</Text>
                                <Text size='xs' color='dimmed'>{post.date}</Text>
                                <Text>
                                    {parse(post.content)}
                                </Text>
                                {
                                    post.video &&
                                    <AspectRatio ratio={16 / 9}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${post.video}?showinfo=0&modestbranding=1`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    </AspectRatio>
                                }
                            </Card>
                        ))
                    }
                </Box>

            </Container>
        </Box>
    )
}

export default ComingSoon