import { Box, Button, Group, Text, Title } from "@mantine/core"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons"

const CategoryHeader = ({headline, toPath}) => {

  const wrapper = (theme) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: `${theme.spacing.lg}px`,
  }) 

  const titleStyle = (theme) => ({
    'root': {
      margin: 0,
    }
  })




  return (
    <Box sx={wrapper}>
        <Title sx={titleStyle} order={3} my='xs' >{headline}</Title>
        <Link href={toPath} passHref>
          <Button variant='subtle' rightIcon={<IconChevronRight size={16} />} compact color='gray'>
            Find
          </Button>
        </Link>
    </Box>
  )
}

export default CategoryHeader