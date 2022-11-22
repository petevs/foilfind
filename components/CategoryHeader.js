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


  return (
    <Box sx={wrapper}>
        <Title style={{margin: '1rem 0'}} order={3} my='xs' >{headline}</Title>
        <Link href={toPath} passHref>
          <Box component='a'>
            <Button variant='subtle' rightIcon={<IconChevronRight size={16} />} compact color='gray'>
              Find
            </Button>
          </Box>
        </Link>
    </Box>
  )
}

export default CategoryHeader