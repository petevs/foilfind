import { Box, Progress, Group, Text, Divider, Title } from '@mantine/core'
import { thousandSeparator } from '../../helpers/formatters'


const FoilSpecs = ({product}) => {


    const foilSpecs = [
        { label: 'Area (cm²)', value: 'areaCM', min: 700, max: 2400 },
        { value: 'wingSpanMillimeters', label: 'Wing Span (mm)', min: 605, max: 1200 },
        { value: 'weightGrams', label: 'Weight (g)', min: 750, max: 2200 },
        { value: 'ar', label: 'Aspect Ratio', min: 4, max: 12 },
    ]

    const getKeys = () => {
        if(product.subCategory === 'front wings') {
            return {
                subKey: 'frontWing',
                specs: foilSpecs
            }
        }
        if(product.subCategory === 'tail wings') {
            return {
                subKey: 'tailWing',
                specs: [
                    { label: 'Area (cm²)', value: 'areaCM', min: 0, max: 400 },
                    { value: 'wingSpanMillimeters', label: 'Wing Span (mm)', min: 100, max: 500 },
                    { value: 'weightGrams', label: 'Weight (g)', min: 100, max: 200 },
                ]
            }
        }
        if(product.subCategory === 'masts') {
            return {
                subKey: 'mast',
                specs: [
                    { label: 'Length (cm)', value: 'lengthCM', min: 40, max: 120 },
                    { label: 'Weight (grams)', value: 'weightGrams', min: 800, max: 2000 },
                ]
            }
        }
        if(product.subCategory === 'fuselages') {
            return {
                subKey: 'fuselage',
                specs: [
                    { label: 'Length (cm)', value: 'lengthCM', min: 40, max: 120 },
                    { label: 'Weight (grams)', value: 'weightGrams', min: 400, max: 2000 },
                ]
            }
        }
    }

    console.log(product)
    console.log(getKeys())



  return (
    <Box>
        <Title order={3} style={{margin: '1rem 0'}}>Foil Specs</Title>
        {
            getKeys().specs.map((spec) => (        
            <Box
                key={spec.value}
                sx={(theme) => ({
                    position: 'relative',
                    marginBottom: theme.spacing.xs
                })}
            >
                <Box
                    sx={(theme) => ({
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: theme.spacing.xs
                    })}
                >
                    <Text weight={600}>{spec.label}</Text>
                    <Text weight={600}>{thousandSeparator(product[getKeys().subKey][spec.value])}</Text>
                </Box>
                <Box>
                    <Progress
                        value={(product[getKeys().subKey][spec.value] - spec.min) / ((spec.max - spec.min)) * 100}
                        color='blue'
                        size='md'
                        radius='sm'
                    />
                </Box>
                <Group position='apart' sx={{marginTop: '3px'}}>
                    <Text size='xs' color='dimmed'>{thousandSeparator(spec.min)}</Text>
                    <Text size='xs' color='dimmed'>{thousandSeparator(spec.max)}</Text>
                </Group>
            </Box>
            ))
        }
    </Box>
  )
}

export default FoilSpecs