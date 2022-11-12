import { Box, Divider, Group, NativeSelect, NumberInput, Select, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useState, useEffect } from 'react'

export const ConfirmedFit = ({category}) => {

    // remove the 's' from the category
    const categorySingular = category.slice(0, -1)

    const [weight, setWeight] = useState(75)
    const [weightUnit, setWeightUnit] = useState('kg')
    const [skillLevel, setSkillLevel] = useState('beginner')
    const [windRange, setWindRange] = useState('moderate')

    const convertToKg = (weight, unit) => {
        if(unit === 'kg') {
            return weight
        } else {
            return weight * 0.453592
        }
    }

    const foilChart = {
        lightOrBeginner: {
            light: [1300, 1800],
            medium: [1550, 2200],
            mediumHeavy: [1700, 2800],
            heavy: [2100, 2400],
        },
        goodWind: {
            light: [800, 1300],
            medium: [850, 1550],
            mediumHeavy: [900, 1600],
            heavy: [1400, 2100],
        }
        
    }
    
    const doesItFit = (riderWeight, skillLevel, windRange, foilSize) => {

        if(!riderWeight || !skillLevel || !windRange || !foilSize) {
            return false
        }

        const getKey = () => {
            if(windRange === 'light' || skillLevel === 'beginner') {
                return 'lightOrBeginner'
            }
            return 'goodWind'
        }
    
        const getWeightRange = () => {
    
            if(riderWeight < 140) {
                return 'light'
            }
            if(riderWeight >= 140 && riderWeight < 170) {
                return 'medium'
            }
            if(riderWeight >= 170 && riderWeight < 200) {
                return 'mediumHeavy'
            }
            if(riderWeight >= 200) {
                return 'heavy'
            }
    
        }
    
        const key = getKey()
        const weightRange = getWeightRange()
    
        const range = foilChart[key][weightRange]
    
        if(foilSize >= range[0] && foilSize <= range[1]) {
            return true
        }
        return false
    
    }



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
                    {
                        doesItFit(convertToKg(weight, weightUnit), skillLevel, windRange, 1200) ?
                        <Group>
                            <IconCheck size={18} />
                            <Text>This foil should fit.</Text>
                        </Group> :
                        <Group>
                            <IconX size={18} color='red' />
                            <Text>This foil may not fit.</Text>
                        </Group>
                    }
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
                        max={200}
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
