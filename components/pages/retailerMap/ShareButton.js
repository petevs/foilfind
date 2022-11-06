import { Modal, Box, Text, ActionIcon, Tooltip, TextInput, CopyButton } from '@mantine/core'
import { IconShare, IconCopy, IconCheck } from '@tabler/icons'
import { useState } from 'react'

const ShareButton = ({retailerPath}) => {

    const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Share This Retailer"
      >
        <Box>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr auto', gap: '.5rem', alignItems: 'center'}}>
                  <TextInput
                    value={`https://foilfind.com/retailers/${retailerPath}`}
                    readOnly
                    sx={{width: '100%'}}
                    variant='filled'
                  />
                <CopyButton value={`https://foilfind.com/retailers/${retailerPath}`} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon variant='filled' color={copied ? 'blue' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                  </Tooltip>
                  )}
                </CopyButton>
              </Box>
              </Box>
      </Modal>

      

      <Box sx={{display: 'grid', justifyItems: 'center'}}
        onClick={() => setOpened(true)}
      >
        <ActionIcon variant='outline' color='dark' radius='xl' size='lg'>
          <IconShare size={16} />
        </ActionIcon>
        <Text size='xs' sx={{marginTop: '.25rem'}} color='dimmed'>Share</Text>
      </Box>

  
    </>
  )
}

export default ShareButton