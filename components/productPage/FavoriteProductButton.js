import { Modal, Box, ActionIcon, Text, UnstyledButton, Group, Button } from '@mantine/core'
import { useState, useContext } from 'react'
import { IconHeart, IconPlus, IconCheck } from '@tabler/icons'
import { UserContext } from '../../state/UserContext'
import { db } from '../../firebase'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'


const FavoritProductButton = ({productID}) => {

    const [opened, setOpened] = useState(false)
    const { user, userDetails } = useContext(UserContext)

    const favorited = userDetails?.favoriteProducts?.includes(productID)

    const toggleFavorites = async () => {
        if(!user){
            setOpened(true)
            return
        }
        if(userDetails?.favoriteProducts.includes(productID)){
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                favoriteProducts: arrayRemove(productID)
            })
            return
        }
        if(!(userDetails?.favoriteProducts.includes(productID))){
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                favoriteProducts: arrayUnion(productID)
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
        <UnstyledButton
            onClick={toggleFavorites}
            sx={(theme) => ({
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                '&:hover': {
                    backgroundColor: theme.colors.gray[0]
                }
            })}
            >
                      <Group spacing='xs'>
                        {
                            favorited ?
                            <IconCheck size={16} /> :
                            <IconPlus size={16} />
                        }
                        <Text underline weight={600} color='primary' size='sm'>My List</Text>
                      </Group>
            </UnstyledButton>
    </>
  )
}

export default FavoritProductButton