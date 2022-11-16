const foilChart = {
  lightOrBeginner: {
      light: [1300, 1800],
      medium: [1550, 2200],
      mediumHeavy: [1700, 2800],
      heavy: [2100, 2400],
  },
  goodWind: {
      light: [800, 1300],
      medium: [850, 1550],
      mediumHeavy: [900, 1600],
      heavy: [1400, 2100],
  }
  
}

const wingChart = {
  'beginner, 14-20kts': {
      '75-100': [3, 5],
      '100-125': [4, 5],
      '125-150': [4, 6],
      '150-175': [5, 7],
      '175-200': [6, 7],
      '200-225': [7, 8],
      '225-250': [7, 8],
  },
  '10-20kts': {
      '75-100': [3, 4],
      '100-125': [4, 5],
      '125-150': [4, 5],
      '150-175': [5, 6],
      '175-200': [5, 7],
      '200-225': [6, 7],
      '225-250': [7, 8],
  },
  '15-25kts': {
      '75-100': [2, 3],
      '100-125': [3, 4],
      '125-150': [4, 5],
      '150-175': [4, 5],
      '175-200': [5, 6],
      '200-225': [5, 6],
      '225-250': [6, 7],
  },
  '25-30kts': {
      '75-100': [2, 3],
      '100-125': [3, 4],
      '125-150': [3, 4],
      '150-175': [4, 5],
      '175-200': [4, 5],
      '200-225': [5, 6],
      '225-250': [5, 6],
  },
  '30-35kts': {
      '75-100': [1, 2],
      '100-125': [2, 3],
      '125-150': [2, 3],
      '150-175': [3, 4],
      '175-200': [3, 4],
      '200-225': [4, 5],
      '225-250': [4, 5],
  },
  '35-40kts': {
      '75-100': [1, 2],
      '100-125': [1, 2],
      '125-150': [2, 3],
      '150-175': [2, 3],
      '175-200': [2, 3],
      '200-225': [3, 4],
      '225-250': [3, 4],
  },

  
}


const boardChart = {
  'completeBeginner': {
    '90-110': [70,100],
    '110-130': [75,105],
    '130-150': [85,115],
    '150-170': [95,125],
    '170-190': [110,130],
    '190-210': [120,140],
    '210-230': [140,500],
    '230-250': [140,500],    
  },
  'beginner': {
    '90-110': [65,95],
    '110-130': [70,100],
    '130-150': [75,105],
    '150-170': [85,115],
    '170-190': [95,125],
    '190-210': [110,130],
    '210-230': [120,150],
    '230-250': [130,500],
  },
  'intermediate': {
    '90-110': [55, 85],
    '110-130': [60, 90],
    '130-150': [65, 95],
    '150-170': [70, 100],
    '170-190': [75, 105],
    '190-210': [85, 115],
    '210-230': [95, 125],
    '230-250': [110, 130],
  },
  'intermediateHighWind': {
    '90-110': [45, 75],
    '110-130': [50, 80],
    '130-150': [55, 85],
    '150-170': [60, 90],
    '170-190': [65, 95],
    '190-210': [70, 100],
    '210-230': [75, 105],
    '230-250': [85, 115],
  },
  'advanced': {
    '90-110': [20,75],
    '110-130': [23, 80],
    '130-150': [25, 85],
    '150-170': [28, 88],
    '170-190': [30, 90],
    '190-210': [35, 95],
    '210-230': [40, 100],
    '230-250': [45, 105],
  },
}


const doesItFitFoil = (riderWeight, skillLevel, windRange, foilSize) => {

  if(!riderWeight || !skillLevel || !windRange || !foilSize) {
      return {
        result: null,
        message: 'Enter your details to find out'
      }
  }

  const getKey = () => {
      if(windRange === 'light' || skillLevel === 'beginner') {
          return 'lightOrBeginner'
      }
      return 'goodWind'
  }

  const getWeightRange = () => {

      if(riderWeight < 140) {
          return 'light'
      }
      if(riderWeight >= 140 && riderWeight < 170) {
          return 'medium'
      }
      if(riderWeight >= 170 && riderWeight < 200) {
          return 'mediumHeavy'
      }
      if(riderWeight >= 200) {
          return 'heavy'
      }

  }

  const key = getKey()
  const weightRange = getWeightRange()

  const range = foilChart[key][weightRange]

  if(foilSize >= range[0] && foilSize <= range[1]) {
      return {
        result: true,
        message: 'This foil should work for you'
      }
  }
  return {
    result: false,
    message: 'This foil may not work well for you'
  }

}

const doesItFitWing = (riderWeight, skillLevel, windRange, wingSize) => {

  if(!riderWeight || !skillLevel || !windRange || !wingSize) {
      return {
        result: null,
        messag: 'Enter your details to find out'
      }
  }

  const getKey = () => {
      if(skillLevel === 'beginner') {
          return 'beginner, 14-20kts'
      }
      if(windRange === 'light') {
          return '10-20kts'
      }
      if(windRange === 'moderate') {
          return '15-25kts'
      }
      if(windRange === 'moderateHeavy') {
          return '25-30kts'
      }
      if(windRange === 'heavy') {
          return '30-35kts'
      }
      if(windRange === 'veryHeavy' || windRange === 'nuking') {
          return '35-40kts'
      }
  }

  const getWeightRange = () => {

      if(riderWeight < 100) {
          return '75-100'
      }
      if(riderWeight >= 100 && riderWeight < 125) {
          return '100-125'
      }
      if(riderWeight >= 125 && riderWeight < 150) {
          return '125-150'
      }
      if(riderWeight >= 150 && riderWeight < 175) {
          return '150-175'
      }
      if(riderWeight >= 175 && riderWeight < 200) {
          return '175-200'
      }
      if(riderWeight >= 200 && riderWeight < 225) {
          return '200-225'
      }
      if(riderWeight >= 225) {
          return '225-250'
      }

  }

  const key = getKey()
  const weightRange = getWeightRange()

  const range = wingChart[key][weightRange]

  if(wingSize >= range[0] && wingSize <= range[1]) {
      return {
        result: true,
        message: 'This wing should work for you'
      }
  }
  return {
    result: false,
    message: 'This wing may not work well for you'
  }



}

const doesItFitBoard = (riderWeight, skillLevel, windRange, boardSize) => {

  if(!riderWeight || !skillLevel || !windRange || !boardSize) {
      return {
        result: null,
        message: 'Enter your details to find out'
      }
  }

  const getKey = () => {
      if(skillLevel === 'beginner') {
          return 'completeBeginner'
      }
      if(skillLevel === 'intermediate' && (windRange === 'light' || windRange === 'moderate')) {
          return 'intermediate'
      }
      if(skillLevel === 'intermediate'){
          return 'intermediateHighWind'
      }
      if(skillLevel === 'advanced' || skillLevel === 'expert') {
          return 'advanced'
      }
  }


  const getWeightRange = () => {
    if(riderWeight > 90 && riderWeight < 110) {
      return '90-110'
    }
    if(riderWeight >= 110 && riderWeight < 130) {
      return '110-130'
    }
    if(riderWeight >= 130 && riderWeight < 150) {
      return '130-150'
    }
    if(riderWeight >= 150 && riderWeight < 170) {
      return '150-170'
    }
    if(riderWeight >= 170 && riderWeight < 190) {
      return '170-190'
    }
    if(riderWeight >= 190 && riderWeight < 210) {
      return '190-210'
    }
    if(riderWeight >= 210 && riderWeight < 230) {
      return '210-230'
    }
    if(riderWeight >= 230 && riderWeight < 250) {
      return '230-250'
    }
  }

  const key = getKey()
  const weightRange = getWeightRange()

  const range = boardChart[key][weightRange]


  if(boardSize >= range[0] && boardSize <= range[1]) {
      return {
        result: true,
        message: 'This board should work for you'
      }
  }

  return {
    result: false,
    message: 'This board may not work well for you'
  }
 

}

export const doesItFit = (riderWeight, skillLevel, windRange, product) => {
  
    if(product.category === 'boards') {
      return doesItFitBoard(riderWeight, skillLevel, windRange, product.volume)
    }
    if(product.category === 'foils') {
      return doesItFitFoil(riderWeight, skillLevel, windRange, product.frontWing.areaCM)
    }
    if(product.category === 'wings') {
      return doesItFitWing(riderWeight, skillLevel, windRange, product.wingSpecs.size)
    }
  
  }