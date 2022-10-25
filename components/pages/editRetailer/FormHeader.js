import { Box, Text } from "@mantine/core"

const FormHeader = ({title, subtitle}) => {
  return (
    <Box py='xl'>
    <Text weight={700} size='xl'>{title}</Text>
    <Text color='dimmed' size='sm'>{subtitle}</Text>
  </Box>
  )
}

export default FormHeader