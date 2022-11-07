import { Box, Badge, Title , Text, Paper, Button} from '@mantine/core'
import React from 'react'

const ResourceCard = ({type, title,}) => {

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
    <Paper withBorder p='md' radius='md'>
      <Box sx={{display: 'grid', alignItems: 'start', justifyItems: 'start'}}>
        <Badge color={colorBasedOnType()} mb='md'>{type}</Badge>
        <Title order={4}>{title}</Title>
        <Text size='sm' color='dimmed'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam mauris, nec aliquam nisl nunc et nisl. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam mauris, nec aliquam nisl nunc et nisl.</Text>
        <Button mt='md' size='xs' radius='md' variant='default'>View Resource</Button>
      </Box>
    </Paper>
  )
}

export default ResourceCard