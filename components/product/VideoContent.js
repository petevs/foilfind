import { AspectRatio, Box } from "tabler-icons-react"

const VideoContent = ({ video }) => {


    console.log(video.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/'))

    return (
        <AspectRatio ratio={16 / 9}>
                <iframe
                    src={video.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
        </AspectRatio>
    )
}

export default VideoContent