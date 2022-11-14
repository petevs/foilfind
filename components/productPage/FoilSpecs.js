import { Box, Progress, Group, Text, Divider, Title } from '@mantine/core'
import { thousandSeparator } from '../../helpers/formatters'


const FoilSpecs = ({product}) => {


    const foilSpecs = [
        { label: 'Area (cm²)', value: 'areaCM', min: 625, max: 2400 },
        { value: 'wingSpanMillimeters', label: 'Wing Span (mm)', min: 605, max: 1200 },
        { value: 'weightGrams', label: 'Weight (g)', min: 430, max: 1620 },
        { value: 'ar', label: 'Aspect Ratio', min: 0, max: 10 },
    ]


  return (
    <Box>
        <Title order={3} style={{margin: '1rem 0'}}>Foil Specs</Title>
        {
            foilSpecs.map((spec) => (        
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
                    <Text weight={600}>{thousandSeparator(product.frontWing[spec.value])}</Text>
                </Box>
                <Box>
                    <Progress
                        value={(product.frontWing[spec.value] - spec.min) / ((spec.max - spec.min)) * 100}
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