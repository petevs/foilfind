import { Modal, Box, TextInput, Button, UnstyledButton, Group, Text, CopyButton } from '@mantine/core'
import { useState } from 'react'
import { IconShare, IconCopy } from '@tabler/icons'

const ProductShareButton = ({url}) => {

    const [opened, setOpened] = useState(false)

  return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="sm"
            title="Share this product"
            closeOnClickOutside={false}
        >
            <Box padding="md">
                <TextInput
                    value={url}
                    variant='filled'
                    readOnly
                />
                <CopyButton value={url}>
                    {
                        ({ copied, copy }) => (
                            <Button
                                onClick={copy}
                                size='sm'
                                mt='sm'
                                fullWidth
                                leftIcon={<IconCopy size={16} />}
                                color={copied ? 'green' : 'dark'}

                            >
                                {copied ? 'Copied url' : 'Copy url'}
                            </Button>
                        )
                    }
                </CopyButton>
            </Box>
        </Modal>
        <UnstyledButton
            onClick={() => setOpened(true)}
        >
            <Group spacing='xs'>
            <IconShare size={14} />
            <Text underline weight={600} color='primary' size='sm'>Share</Text>
            </Group>
        </UnstyledButton>
    </>
  )
}

export default ProductShareButton