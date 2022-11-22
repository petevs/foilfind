import { Box, Badge, Title , Text, Paper, Button} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const ResourceCard = ({type, title, shortDescription, path, thumbnail}) => {

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

  const clipTextToLength = (text, length) => {
    if(text.length > length) {
      return text.substring(0, length) + '...'
    }
    return text
  }

  return (
    <Link href={`/resources/${path}`} passHref>
      <Box
        component='a'
        sx={(theme) => ({
          display: 'grid', 
          alignItems: 'start', 
          justifyItems: 'start',
          // border: '1px solid',
          // borderColor: theme.colors.gray[3],
          width: '275px',
          // borderRadius: theme.radius.md,
          // padding: theme.spacing.md,
          color: theme.colors.gray[9],
          '& h4': {
            color: theme.colors.dark,
          },
          '&:hover': {
            borderColor: theme.colors.dark[5],
            cursor: 'pointer',
          }
        })}>
        {/* <Badge color={colorBasedOnType()} mb='md'>{type}</Badge> */}
        <Box
          sx={{
            '& span': {
              borderRadius: '8px'
            }
          }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={274}
            height={154}
          />
        </Box>
        <Text size='sm' color='dark' weight={600}>{title}</Text>
        <Text size='xs' color='dimmed'>{clipTextToLength(shortDescription, 200)}</Text>
        {/* <Button mt='md' size='xs' radius='md' variant='default'>View Resource</Button> */}
      </Box>
    </Link>
  )
}

export default ResourceCard