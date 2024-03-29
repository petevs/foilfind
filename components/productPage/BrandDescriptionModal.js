import { Modal, UnstyledButton, Text, Box } from '@mantine/core'
import { useState } from 'react'
import { IconChevronRight } from '@tabler/icons'

const BrandDescriptionModal = ({description, brand}) => {

    const [opened, setOpened] = useState(false)

  return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={`Description from ${brand}`}
            size="lg"
            noPadding
            transition='slide-up'
            transitionDuration={300}
            transitionTimingFunction='ease'
            centered
            styles={{
                header: {
                  fontWeight: 700,
                  fontSize: '1.4rem',
                }
            }}
        >
          <Box
            sx={{
              height: '50vh',
              overflowY: 'scroll',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Box>
        </Modal>
        <UnstyledButton
            onClick={() => setOpened(true)}
        >
                {/* <Text color='primary' size='sm'>...</Text> */}
                <Box sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center'}} >
                  <Text color='primary' size='md' underline>Read More</Text>
                  <IconChevronRight size={16} />
                </Box>
              </UnstyledButton>
    </>
  )
}

export default BrandDescriptionModal