import { Modal, Box, ActionIcon, Text, Textarea, Rating, Button, Divider } from '@mantine/core'
import { IconStar } from '@tabler/icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../state/UserContext'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

const ReviewButton = ({ retailerID, retailerName, retailerPath }) => {

    const { user, userDetails } = useContext(UserContext)


    const reviewed = () => {
        if(userDetails.retailerReviews){
            
            return retailerID in userDetails.retailerReviews

        }

        return false
    }

    const [opened, setOpened] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [changed, setChanged] = useState(false)

    useEffect(() => {

        if(userDetails.retailerReviews){
            if(retailerID in userDetails.retailerReviews){
                setRating(userDetails.retailerReviews[retailerID]?.rating || 0)
                setReview(userDetails.retailerReviews[retailerID]?.review || '')
            }
        }

    },[userDetails, retailerID])



    const handleReviewClick = () => {
        setOpened(true)
    }

    const handleSave = async () => {

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        const retailerReviewsFirebase = docSnap.data().retailerReviews
        await updateDoc(docRef, {
            retailerReviews: {
                ...retailerReviewsFirebase,
                [retailerID]: {
                    rating,
                    review,
                    path: retailerPath

                }
            }
        })
        setOpened(false)
    }

  return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={`Write a Review for ${retailerName}`}
            size="lg"
            closeOnClickOutside={false}
        >
            <Box sx={(theme) => ({display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem', alignItems: 'center'})} pb='md'>
                <Rating
                    styles={{root: {marginBottom: '0'}}}
                    label="Rating"
                    value={rating}
                    fractions={2}
                    onChange={(v) => setRating(v)}
                />
                <Text size='sm'>{rating} / 5</Text>
            </Box>

            <Textarea
                placeholder="Write your review here"
                minRows={5}
                autosize
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <Box
                sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}
                pt='md'
            >
                <Button
                    sx={{justifySelf: 'start'}}
                    onClick={() => setOpened(false)}
                    variant='default'
                >
                    Cancel
                </Button>
                <Button
                    sx={{justifySelf: 'end'}}
                    color='dark'
                    size='sm'
                    onClick={handleSave}
                >Save</Button>
            </Box>
        </Modal>

        <Box sx={{display: 'grid', justifyItems: 'center'}}
            onClick={handleReviewClick}
        >
            <ActionIcon color='dark' radius='xl' size='lg' variant={reviewed() ? 'filled' : 'outline'}
            >
              <IconStar size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Review</Text>
        </Box>
    
    </>
  )
}

export default ReviewButton