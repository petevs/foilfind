import { Box, Divider, Title, Text, Button, Group, Modal, Textarea, Rating, Avatar } from "@mantine/core"
import RatingsReadOnly from "../RatingsReadOnly"
import { useState, useContext } from 'react'
import { UserContext } from "../../state/UserContext"
import Link from "next/link"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase"

const ProductReviews = ({targetRef, product}) => {

    const [opened, setOpened] = useState(false)
    const { user, userDetails } = useContext(UserContext)
    const [rating, setRating] = useState(0)
    const [reviewContent, setReviewContent] = useState('')

    const getReviewSummary = (newReview) => {
        let total = 0
        const reviews = [...product.reviews, newReview]
        reviews.forEach(review => {
          total += review.rating
        })
    
        return {
          rating: total / reviews.length,
          numOfReviews: reviews.length
        }
      }

    const aggregateReviewsBySource = (reviews) => {
        const sources = reviews.map(review => review.source)
        const uniqueSources = [...new Set(sources)]
        const reviewsBySource = uniqueSources.map(source => {
          const reviewsForSource = reviews.filter(review => review.source === source)
          const averageRating = reviewsForSource.reduce((acc, review) => acc + review.rating, 0) / reviewsForSource.length
          return {
            source,
            averageRating,
            reviews: reviewsForSource,
            link: reviewsForSource[0].link
          }
        })
        return reviewsBySource
      }

    const handleReviewSubmit = async () => {
        const docRef = doc(db, 'products', product.id)
        const newReview = {
            rating,
            content: reviewContent,
            source: 'Foil Find',
            link: `https://foilfind.com/product/${product.path}`,
            username: userDetails?.username,
        }
        const reviewSummary = getReviewSummary(newReview)

        await updateDoc(docRef, {
            reviewSummary: reviewSummary,
            reviews: arrayUnion(newReview)
        })

        const userDoc = doc(db, 'users', user.uid)
        await updateDoc(userDoc, {
            reviews: arrayUnion({
                source: 'foilfind',
                rating,
                content: reviewContent,
                link: `https://foilfind.com/product/${product.id}`,
                username: userDetails?.username,
            })
        })

        setOpened(false)


    }

  return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="lg"
            title={`Write a review for the ${product.name}`}
            closeOnClickOutside={false}
        >
            {
                user ?
                <Box padding="md">
                    <Group spacing='xs'>
                        <Rating
                            size='md'
                            value={rating}
                            onChange={setRating}
                            fractions={2}
                        />
                        <Text size='md' color='dimmed'>{rating} / 5</Text>
                    </Group>
                    <Textarea
                        mt='sm'
                        placeholder='Write your review here'
                        minRows={5}
                        fullWidth
                        autosize
                        value={reviewContent}
                        onChange={e => setReviewContent(e.target.value)}
                    />
                    <Button
                        fullWidth
                        mt='sm'
                        color='dark'
                        variant='filled'
                        onClick={handleReviewSubmit}
                    >
                        Submit Review
                    </Button>
                </Box>
                :
                <Box padding="md">
                    <Text>
                        You must be logged in to write a review.
                    </Text>
                    <Link
                        href='/sign-in'
                        passHref
                    >
                        <Button
                            fullWidth
                            mt='sm'
                            color='dark'
                            variant='filled'
                        >
                            Log in
                        </Button>
                    </Link>
                </Box>
            }

        </Modal>

        <Box ref={targetRef}> 
        <Divider my='lg' />
        <Title order={3} >Reviews</Title> 
        <Box
            mt='md'
            sx={({ theme }) => ({
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '1rem',
                '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr',
                    },
                })}
        >
            <Box>
                {
                aggregateReviewsBySource(product.reviews).map((item, index) => (
                    <Box 
                        key={index} 
                        component={item.source === 'Foil Find' ? 'div' : 'a'}
                        href={item.link}
                        target='_blank'
                        sx={{
                            display: 'grid', 
                            gridAutoFlow: 'column', 
                            justifyContent: 'start', 
                            gap: '1rem', 
                            alignItems: 'center'
                        }}
                    >
                        <Text color='dimmed'>{item.averageRating} /  5</Text>
                        <Box sx={{marginTop: '8px'}}>
                        <RatingsReadOnly rating={item.averageRating} size={18} />
                        </Box>
                        <Text 
                            component={item.source === 'Foil Find' ? 'div' : 'a'} 
                            underline={item.source !== 'Foil Find'} 
                            size='md'
                        > 
                            {item.reviews.length} {item.source} reviews
                        </Text>

                    </Box>
                ))

                }
            </Box>
            <Box>

                {
                    product.reviews.filter(review => review.source === 'Foil Find').map((review, index) => (
                        <Box
                            key={index}
                            sx={(theme) => ({
                                border: `1px solid ${theme.colors.gray[3]}`,
                                borderRadius: theme.radius.md,
                                padding: theme.spacing.lg,
                                marginBottom: theme.spacing.md,
                            })}
                        >
                            <Link href={`/${review.username}`} passHref>
                                <Group spacing='xs' mb='xs'
                                    sx={(theme) => ({
                                        '&:hover': {
                                            cursor: 'pointer',
                                            '& .mantine-Text-root': {
                                                color: theme.colors.blue[7],
                                            }
                                        }
                                    })}
                                >
                                    <Avatar 
                                        size='sm'
                                        radius='xl'
                                        src={userDetails.avatar}
                                    />
                                    <Text size='md' color='dark' weight={600}>@{review.username}</Text>
                                </Group>
                            </Link>
                            <RatingsReadOnly rating={review.rating} size={18} />
                            <Text italic color='dimmed' size='md'>{review.content}</Text>
                            {
                                review.username === userDetails?.username &&
                                <>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            justifyItems: 'end'
                                        }}
                                    >
                                        <Button
                                            size='xs'
                                            compact
                                            color='dark'
                                            onClick={() => {
                                                setReviewContent(review.content)
                                                setRating(review.rating)
                                                setOpened(true)
                                            }}
                                        >
                                            Edit Review
                                        </Button>
                                    </Box>
                                </>
                            }
                        </Box>
                    ))
                }

                {
                    // if user has written a review hide this section
                    product.reviews.filter(review => review?.username === userDetails?.username).length === 0 &&
                    <Box
                        sx={(theme) => ({
                            border: `1px solid ${theme.colors.gray[3]}`,
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.lg,
                        })}
                    >
                        <Title order={4}>Share your thoughts</Title>
                        <Text color='dimmed'>
                                If you{'\''}ve used this product, share your thoughts with the community.
                        </Text>
                        <Button mt='sm' size='sm' color='dark' variant='outline'
                            onClick={() => setOpened(true)}
                        >
                            Write a review
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
        </Box>
    </>
  )
}

export default ProductReviews