import { Box, Group, Text } from '@mantine/core'
import React from 'react'

// make list of 30 numbers
const numbers = Array.from(Array(30).keys())



const broadRange = (min, max) => {
  return Array.from(Array(max - min + 1).keys()).map((n) => n + min)
}

const ranges = [
  {
    weight: '2.5m',
    beginner: [18, 27],
    intermediate: [15, 31],
    advanced: [12, 34]
  },
  {
    weight: '3.5m',
    beginner: [17, 24],
    intermediate: [12, 27],
    advanced: [10,30]
  },
  {
    weight: '4.5m',
    beginner: [15, 22],
    intermediate: [10, 25],
    advanced: [8, 28]
  },
  {
    weight: '5.5m',
    beginner: [13, 20],
    intermediate: [8, 23],
    advanced: [6, 26]
  },
  {
    weight: '6.5m',
    beginner: [11, 18],
    intermediate: [6, 21],
    advanced: [4, 24]
  },
]

const cats = [
  {label: 'Beginner', color: 'green'},
  {label: 'Intermediate', color: 'orange'},
  {label: 'Advanced', color: 'red'},
]


// if beginner and in range then green
// if intermediate/advanced and in range then orange
// if beginner and not in range then red

// write a function that takes index in ranges and if beginner and in range then green, if intermediate and in range then orange, if advanced and in range then red, othewrise gray

const getColor = (rangesIndex, currentCell ) => {
  const { beginner, intermediate, advanced } = ranges[rangesIndex]
  if(currentCell >= beginner[0] && currentCell <= beginner[1]){
    return 'green'
  }
  if(currentCell >= intermediate[0] && currentCell <= intermediate[1]){
    return 'orange'
  }
  if(currentCell >= advanced[0] && currentCell <= advanced[1]){
    return 'red'
  }
  return null
}



const WingRangeChart = () => {
  return (
    <>
    <Text my='md' size='lg' color='dimmed' align='center'>Wing Size vs Wind Speed</Text>
    <Box sx={{display: 'grid', gridTemplateColumns: `65px repeat(${(broadRange(5,35).length - 1) / 5}, 1fr) auto`, gap: '.15rem', paddingBottom: '.5rem'}}>
      <Box></Box>
      <Text>5 kts</Text>
      <Text>10</Text>
      <Text>15</Text>
      <Text>20</Text>
      <Text>25</Text>
      <Text>30</Text>
      <Text>35</Text>
      {/* {
        // Header row
        broadRange(5,35).map((n) => (
          <Text
            align='center' 
            key={`${n} header`}
            sx={{visibility: n % 5 === 0 ? 'visible' : 'hidden'}}
          >{n}</Text>
        ))
      } */}
    </Box>
    {
      ranges.map((range) => (
        <Box
          key={range.weight}
          sx={{display: 'grid', gridTemplateColumns: `65px repeat(${broadRange(5,35).length}, 1fr)`, gap: '.15rem', alignItems: 'center'}}
        >
          <Box><Text>{range.weight}</Text></Box>
            {
              broadRange(5,35).map((n) => {
                return (
                  <Box 
                    key={`${n} mark`}
                    sx={(theme) => ({
                      backgroundColor: getColor(ranges.indexOf(range), n) ? theme.colors[getColor(ranges.indexOf(range), n)][7] : theme.colors.gray[2],
                      height: '15px',
                    })}
                  />
                )
              }
              )
            }
        </Box>
      ))
    }
    <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'center', gap: '1rem', padding: '1rem'}}>
      {
        cats.map((cats) => (
        <Group key={cats.label}>
          <Box sx={(theme) => ({height: '15px', width: '15px', borderRadius: '50%', backgroundColor: theme.colors[cats.color][7]})} />
          <Text>{cats.label}</Text>
        </Group>
        ))
      }
    </Box>
    </>


    // <Box>
    //   <Box sx={{display: 'grid', gridTemplateColumns: '150px repeat(6, 1fr)', justifyItems: 'start', gap: '.5rem'}}>
    //     <Text weight={600}>Knots</Text>
    //     <Text>5</Text>
    //     <Text>10</Text>
    //     <Text>15</Text>
    //     <Text>20</Text>
    //     <Text>25</Text>
    //     <Text>30</Text>
    //   </Box>

    //   {
    //     ranges.map(range => (
    //       <Box key={range.weight} sx={{display: 'grid', gridTemplateColumns: '150px repeat(6, 1fr)', justifyItems: 'start', gap: '.5rem'}}>
    //         <Text weight={600}>{range.weight}</Text>
    //           <Box
    //             sx={{
    //               display: 'grid',
    //               gridAutoFlow: 'column',
    //               gap: '.5rem'
    //             }}
    //           >
    //             {
    //               numbers.map(number => (
    //                 <Box
    //                   key={number}
    //                   sx={(theme) => ({
    //                     width: '1rem',
    //                     height: '1rem',
    //                     backgroundColor: number < 10 ? theme.colors.gray[1] : theme.colors['green'][5]
    //                   })}
    //                 />
    //               ))
    //             }
    //           </Box>
    //       </Box>
    //     ))
    //   }



    // </Box>
  )
}

export default WingRangeChart