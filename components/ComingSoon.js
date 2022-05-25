import { Box, Button, Center, Container, Text, TextInput, Group, Timeline, Divider, AspectRatio, Card, createStyles, Dialog, Modal, ThemeIcon, Stack } from "@mantine/core"
import { Circle, Mail, Search, ThumbUp } from "tabler-icons-react"
import FoilFindLogo from "../components/FoilFindLogo"
import PostCard from "./PostCard"
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import parse from 'html-react-parser'
import dayjs from "dayjs"



const ComingSoon = () => {

    const style = {
        display: 'grid',
    }

    const [dialogBox, setDialogBox] = useState(false)
    const [email, setEmail] = useState('')

    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {

        // const getPost = async () => {
        //     const docRef = doc(db, 'updates', 'uHPm88FzqFmUYw7SjNOd')
        //     const docSnap = await getDoc(docRef)
        //     setPost(docSnap.data())
        // }

        const getPosts = async () => {

            const updateList = []
            const q = query(collection(db, 'updates'))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                updateList.push(doc.data())
            })
            setPosts(updateList)
        }

        getPosts()

        // getPost()

    },[])

    const getDate = (post) => {
        if(post.date){
            return dayjs(post.date.toDate()).format('MMMM DD YYYY h:mm A')
        }

        return ''
    }   


    const handleEmailSubscribe = async () => {
        const docRef = await addDoc(collection(db, 'waitingList'), {
            email: email
        })

        console.log(docRef)
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
            <Box sx={(theme) => ({borderBottom: `1px solid ${theme.colors.dark[0]}`})}>
                <Container size='xl' p='xs'>
                    <Group position='apart'>
                        <FoilFindLogo width='75' />
                        <Button 
                            component='a' 
                            href='mailto:hey@foilfind.com?subject=Inquiry from the site' 
                            variant="outline" 
                            radius='xl' 
                            size='xs' 
                            leftIcon={<Mail height='12px' width='12px' />}
                            sx={{
                                '& span': {
                                    marginRight: '5px'
                                }
                            }}
                        >
                            hey@foilfind.com
                        </Button>
                    </Group>
                </Container>
            </Box>
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
                                withBorder 
                                shadow='lg' 
                                mb='xl' 
                                sx={(theme) => ({
                                    backgroundColor: theme.colors.gray[0]
                                })}
                                p='xl'
                            >
                                <Text weight={700} size='xl'>{post.title}</Text>
                                <Text size='xs' color='dimmed'>{getDate(post)}</Text>
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