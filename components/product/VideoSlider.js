import { Box, Image, UnstyledButton, Overlay, Modal, AspectRatio, ScrollArea } from '@mantine/core'
import { useState } from 'react'

const VideoSlider = ({videos}) => {

    console.log(videos[0].split('v=')[1])

    const getThumnail = ( video ) => {
        const id = video.split('v=')[1]
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }

    const [open, setOpen] = useState(false)
    const [currentVideo, setCurrentVideo] = useState(videos[0])

    const handleClick = ( videoURL ) => {
        setCurrentVideo(videoURL)
        setOpen(true)
    }



    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                size='80%'
                centered
                padding='xs'
                withCloseButton={false}
            >
                <AspectRatio ratio={16 / 9}>
                        <iframe
                            src={currentVideo.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                </AspectRatio>
            </Modal>
            <Box sx={{
                display: 'grid', 
                gridAutoFlow: 'column', 
                gap: '1rem', 
                justifyContent: 'start',
                overflowX: 'scroll', 
                padding: '2rem 0',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                {
                    videos.map( (video, index) => (
                        <UnstyledButton
                            key={index}
                            onClick={() => handleClick(video)}
                            sx={{
                                width: '347px',
                                '&:hover': {
                                    transform: 'scale(1.15)',
                                    transition: 'transform .2s ease-in-out',
                                    zIndex: 9
                                },   
                            }}
                        >
                            <Box>
                                <Image
                                    width='100%'
                                    height='195px'
                                    radius='md'
                                    fit='cover'
                                    src={getThumnail(video)}
                                    // sx={(theme) => ({border: `1px solid ${theme.colors.dark[2]}`, borderRadius: theme.radius.md})}
                                />
                            </Box>
                        </UnstyledButton>
                    ))
                }
            </Box>
        </>

    )
}

export default VideoSlider