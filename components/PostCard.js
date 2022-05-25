import { Box, Text, Divider, Card } from "@mantine/core"
import { Data } from "@react-google-maps/api"
import { FieldValue, Timestamp } from "firebase/firestore"
import parse from 'html-react-parser'
import { AspectRatio } from "tabler-icons-react"

const PostCard = ({ post }) => {


    const articleSection = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '100px auto 1fr',
        gap: '3rem',
        alignContent: 'start',
        marginBottom: '3rem'
    })

    const newTest = () => {
        if(post.date){
            return post.date.toDate().toISOString()
        }

        return ''
    }   

    return (
        <AspectRatio ratio={16 / 9}>
        <iframe
            src="https://www.youtube.com/embed/Dorf8i6lCuk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
        </AspectRatio>
        // <Card withBorder sx={{height: '600px'}}>
        //     <Text weight={700} size='lg'>{post.title}</Text>
        //     <Text color='dimmed' size='sm'>{newTest()}</Text>
        //     {parse(post.content)}
        //     <AspectRatio ratio={16 / 9}>
        //             <iframe
        //                 src="https://www.youtube.com/embed/Dorf8i6lCuk"
        //                 title="YouTube video player"
        //                 frameBorder="0"
        //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //                 allowFullScreen
        //             />
        //             </AspectRatio>
        // </Card>

    )
}

export default PostCard