import { Box, Badge, Title , Text, Paper, Button} from '@mantine/core'
import Link from 'next/link'

const ResourceCard = ({type, title, description, path}) => {

  const colorBasedOnType = () => {
    switch(type) {
      case 'video':
        return 'red'
      case 'article':
        return 'blue'
      case 'guide':
        return 'green'
      default:
        return 'gray'
    }
  }

  return (
    <Link href={`/resources/${path}`} passHref>
    <Paper withBorder p='md' radius='md'>
      <Box sx={{display: 'grid', alignItems: 'start', justifyItems: 'start'}}>
        <Badge color={colorBasedOnType()} mb='md'>{type}</Badge>
        <Title order={4}>{title}</Title>
        <Text size='sm' color='dimmed'>{description}</Text>
        <Button mt='md' size='xs' radius='md' variant='default'>View Resource</Button>
      </Box>
    </Paper>
    </Link>
  )
}

export default ResourceCard