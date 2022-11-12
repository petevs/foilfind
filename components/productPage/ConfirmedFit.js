import { Box, Divider, Group, Select, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import React from 'react'

export const ConfirmedFit = ({category}) => {

    // remove the 's' from the category
    const categorySingular = category.slice(0, -1)

  return (
    <>
    <Box
        sx={(theme) => ({
            border: `1px solid ${theme.colors.dark[0]}`,
            borderRadius: theme.radius.md,
            margin: '1rem 0',
        })}
    >
        <Box
            sx={(theme) => ({
                border: `3px solid ${theme.colors.gray[0]}`,
                borderRadius: theme.radius.md,
                padding: '.75rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                justifyContent: 'space-between',
                '@media (max-width: 600px)': {
                    gridTemplateColumns: '1fr',
                    gap: '1rem',
                    padding: '1rem',
                }
                })}
        >
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    gridAutoFlow: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    '@media (max-width: 768px)': {
                        justifyContent: 'space-between',
                    }
                })}
            >
                <Text weight={700} size='md' color='dark' transform='capitalize'>Does This {category.slice(0, -1)} Fit You?</Text>
                <Divider orientation='vertical' />
                <Group spacing='xs'>
                    {/* <IconCheck size={18} /> */}
                    <Text size='sm' color='dark'>Enter your details to find out</Text>
                </Group>
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    gap: '.5rem',
                })
                }
            >
                <Select
                    placeholder='Weight'
                    size='xs'
                    variant='filled'
                    sx={(theme) => ({
                        border: `1px solid ${theme.colors.dark[0]}`,
                        borderRadius: theme.radius.sm,
                    })}
                    data={[
                        { label: '100kg', value: '100kg' },
                        { label: '90kg', value: '90kg' },
                        { label: '80kg', value: '80kg' },
                        { label: '70kg', value: '70kg' },  
                    ]}
                />
                <Select
                    placeholder='Skill level'
                    size='xs'
                    variant='filled'
                    data={[
                        { label: 'Beginner', value: 'Beginner' },
                        { label: 'Intermediate', value: 'Intermediate' },
                        { label: 'Advanced', value: 'Advanced' },
                    ]}
                />
                <Select
                    placeholder='Wind range'
                    size='xs'
                    variant='filled'
                    data={[
                        { label: '0-10kts', value: '0-10kts' },
                        { label: '10-20kts', value: '10-20kts' },
                        { label: '20-30kts', value: '20-30kts' },
                        { label: '30-40kts', value: '30-40kts' },
                    ]}
                />
            </Box>
        </Box>
    </Box>
    <Divider my='md' />
    </>
  )
}
