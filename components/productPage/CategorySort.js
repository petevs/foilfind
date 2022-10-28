import { Box, Button, Divider, Group, Text, UnstyledButton } from '@mantine/core'
import { IconSortDescending } from '@tabler/icons';

const CategorySort = ({ filters, setFilters}) => {

  const handleSort = (val) => {
    setFilters({
      ...filters,
      sort: val
    })
  }

  const wrapper = (theme) => ({
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    boxShadow: '0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)',
    backgroundColor: '#fff',
    marginBottom: '1rem',
    height: '80px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto 1fr auto auto',
    gap: '1rem'
  })

  const SortDivider = () => {
    return (
      <Box sx={{width: '5px', display: 'grid', justifyItems: 'center', padding: '1rem 0'}}>
        <Box sx={{width: '1px', backgroundColor: '#ced4da'}} />
      </Box>
    )
  }

  const SortBox = ({title, subtext, active, sortVal}) => {

    const wrapper = (theme) => ({
      display: 'grid',
      gridTemplateRows: '1fr auto',
      borderBottom: sortVal === filters.sort && '3px solid #228be6',
      color: sortVal === filters.sort ? theme.colors.dark[5] : theme.colors.dark[2],
      '& :hover': {
        backgroundColor: '#F0F3F5',
        color: theme.colors.dark[5],
        cursor: 'pointer'
      },
    })

    const buttonStyle = (theme) => ({
      padding: '0 1rem',
      display: 'grid',
      alignContent: 'center'
    })


    return (
      <Box sx={wrapper}>
          <Box sx={buttonStyle} onClick={() => handleSort(sortVal)}>
            <Text weight={700}>{title}</Text>
            <Text size='xs'>{subtext}</Text>
          </Box>
      </Box>
    )

  }


  return (
    <Box 
      sx={wrapper}
    >
      <SortBox title='Cheapest' subtext='$1899 · HS1350' sortVal='cheapest'/>

      <SortDivider />

      <SortBox title='Most Popular' subtext='$1899 · HS1350' active sortVal='popular' />

      <SortDivider />

      <SortBox title='Newest' subtext='$1899 · HS1350' sortVal='newest' />

      <SortDivider />

      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          padding: '0 1rem'
        }}
      >
       <UnstyledButton>
        <Group spacing='xs'>
          <IconSortDescending size={12} />
          <Text size='xs'>Other Sort</Text>
        </Group>
       </UnstyledButton>
      </Box>
    </Box>
  )
}

export default CategorySort;