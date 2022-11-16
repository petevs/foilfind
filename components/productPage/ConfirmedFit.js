import { Box, Divider, Group, NativeSelect, NumberInput, Select, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useState, useEffect } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { doesItFit } from './confirmedFit/doesItFit'

export const ConfirmedFit = ({product}) => {

    const { category } = product

    // remove the 's' from the category
    const categorySingular = category.slice(0, -1)

    const [weight, setWeight] = useLocalStorage({key: 'weight', defaultValue: 75})
    const [weightUnit, setWeightUnit] = useLocalStorage({key: 'weightUnit', defaultValue: 'kg'})
    const [skillLevel, setSkillLevel] = useLocalStorage({key: 'skillLevel', defaultValue: 'beginner'})
    const [windRange, setWindRange] = useLocalStorage({ key: 'windRange', defaultValue: 'moderate'})

    const convertToLbs = (weight, unit) => {
        if(unit === 'kg') {
            return weight / 0.453592
        } else {
            return weight
        }
    }

    console.log(product)

    const doesItFitResult = doesItFit(convertToLbs(weight, weightUnit), skillLevel, windRange, product)
    const doesItFitState = doesItFitResult.result
    const doestItFitMessage = doesItFitResult.message


  return (
    <>
    <Box
        sx={(theme) => ({
            border: `1px solid`,
            borderColor: doesItFitState ? theme.colors.green[5] : theme.colors.red[5],
            borderRadius: theme.radius.md,
            margin: '1rem 0',
        })}
    >
        <Box
            sx={(theme) => ({
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
                        <Group>
                            {
                                doesItFitState ? <IconCheck size={20} color='green' /> : <IconX size={20} color='red' />

                                
                            }
                            <Text>{doestItFitMessage}</Text>
                        </Group>
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
                {/* <Select
                    placeholder='Weight'
                    size='xs'
                    variant='filled'
                    sx={(theme) => ({
                        border: `1px solid ${theme.colors.dark[0]}`,
                        borderRadius: theme.radius.sm,
                    })}
                    data={weightOptions}
                /> */}
                <Box sx={{display: 'grid', gridAutoFlow: 'column'}}>
                    <NumberInput
                        placeholder='Weight'
                        size='xs'
                        min={0}
                        max={250}
                        step={1}
                        styles={{
                            input: {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: 'none',
                                width: 75,
                            },
                            rightSection: {
                                display: 'none'
                            }
                        }}
                        value={weight}
                        onChange={(event) => {
                            setWeight(event)
                        }}
                    />
                    <NativeSelect
                        size='xs'
                        styles={{
                            input: {
                                fontWeight: 500,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                            }
                        }}
                        data={[
                            { label: 'kg', value: 'kg' },
                            { label: 'lbs', value: 'lbs' },
                        ]}
                        value={weightUnit}
                        onChange={(event) => setWeightUnit(event.target.value)}
                    />
                </Box>
                <Select
                    placeholder='Skill level'
                    size='xs'
                    data={[
                        { label: 'Beginner', value: 'beginner' },
                        { label: 'Intermediate', value: 'intermediate' },
                        { label: 'Advanced', value: 'advanced' },
                        { label: 'Expert', value: 'expert' },
                    ]}
                    value={skillLevel}
                    onChange={(event) => setSkillLevel(event)}
                />
                <Select
                    placeholder='Wind range'
                    size='xs'
                    data={[
                        { label: '10-15kts', value: 'light' },
                        { label: '15-20kts', value: 'moderate' },
                        { label: '20-25kts', value: 'moderateHeavy' },
                        { label: '25-30kts', value: 'heavy' },
                        { label: '30-35kts', value: 'veryHeavy' },
                        { label: '35kts+', value: 'nuking' },
                    ]}
                    value={windRange}
                    onChange={(event) => setWindRange(event)}
                />
            </Box>
        </Box>
    </Box>
    <Divider my='md' />
    </>
  )
}
