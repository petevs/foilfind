import { Modal, Box, ActionIcon, Text } from '@mantine/core'
import { useState, useContext } from 'react'
import { IconHeart } from '@tabler/icons'
import { UserContext } from '../../../state/UserContext'
import { db } from '../../../firebase'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'


const FavoriteRetailerButton = ({retailerID}) => {

    const [opened, setOpened] = useState(false)
    const { user, userDetails } = useContext(UserContext)

    const favorited = userDetails?.favoriteRetailers?.includes(retailerID)

    const toggleFavorites = async () => {
        if(!user){
            setOpened(true)
            return
        }
        if(userDetails?.favoriteRetailers.includes(retailerID)){
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                favoriteRetailers: arrayRemove(retailerID)
            })
            return
        }
        if(!(userDetails?.favoriteRetailers.includes(retailerID))){
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                favoriteRetailers: arrayUnion(retailerID)
            })
            return
        }
    }

  return (
    <>
        <Modal
            title="Modal title"
            opened={opened}
            onClose={() => setOpened(false)}
        >
            Sorry you are not logged ing
        </Modal>

        <Box 
            sx={{display: 'grid', justifyItems: 'center'}}
            onClick={toggleFavorites}
        >
            <ActionIcon color='dark' radius='xl' size='lg' variant={favorited ? 'filled' : 'outline'}>
            <IconHeart size={16} />
            </ActionIcon>
            <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Favorite</Text>
        </Box>
    </>
  )
}

export default FavoriteRetailerButton