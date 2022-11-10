const initialFoilKitSpecs = (product) => {
  return {
    style: product?.style || '',
    riderWeight: product?.riderWeight || '',
    riderSkillLevel: product?.riderSkillLevel || [],
    constructionMaterial: product?.constructionMaterial || '',
    disciplines: product?.disciplines || [],
    frontWing: {
      areaCM: product?.frontWing?.areaCM || 0,
      weightGrams: product?.frontWing?.weightGrams || 0,
      wingSpanMillimeters: product?.frontWing?.wingSpanMillimeters || 0,
      ar: product?.frontWing?.ar || 0,
    },
    tailWing: {
      areaCM: product?.tailWing?.areaCM || 0,
      weightGrams: product?.tailWing?.weightGrams || 0,
      wingSpanMillimeters: product?.tailWing?.wingSpanMillimeters || 0,
    },
    fuselage: {
      lengthCM: product?.fuselage?.lengthCM || 0,
      weightGrams: product?.fuselage?.weightGrams || 0,
    },
    mast: {
      lengthCM:  product?.mast?.lengthCM || 0,
      weightGrams: product?.mast?.weightGrams || 0,
    }
  }
}


const initialBoardSpecs = (product) => {
  return {
    length: product?.length || '',
    width: product?.width || '',
    thickness: product?.thickness || '',
    volume: product?.volume || '',
    riderWeight: product?.riderWeight || [],
    riderSkillLevel: product?.riderSkillLevel || [],
    disciplines: product?.disciplines || [],
    constructionMaterial: product?.constructionMaterial || '',
  }
}

const initialProductInfo = (product) =>  ({
  id: product?.id || '',
  name: product?.name || '',
  category: product?.category || '',
  subCategory: product?.subCategory || '',
  brand: product?.brand || '',
  releaseYear: product?.releaseYear || '',
  msrp: product?.msrp || 0,
  brandDescription: product?.brandDescription || '',
})

const initialWingSpecs = (product) => {
  return {
    size: product?.size || '',
    weight: product?.weight || '',
  }
}


const constructionMaterials = [
  { label: 'Aluminum', value: 'aluminum' },
  { label: 'Carbon', value: 'carbon' },
]

const styles = [
  { label: 'High Aspect', value: 'high aspect' },
  { label: 'High Speed', value: 'high speed' },
  { label: 'Carving / Freeride', value: 'carving freeride' },
]

const riderWeights = [
  { label: 'Light', value: 'light' },
  { label: 'Medium', value: 'medium' },
  { label: 'Heavy', value: 'heavy' },
]

const riderSkillLevels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const disciplines = [
  { label: 'Wing', value: 'wing' },
  { label: 'Kite', value: 'kite'},
  { label: 'Wake', value: 'wake' },
  { label: 'Surf', value: 'surf' },
  { label: 'SUP', value: 'sup' },
  { label: 'Wind', value: 'wind'},
  { label: 'Tow', value: 'tow'}
]

export { initialFoilKitSpecs, initialBoardSpecs, initialWingSpecs, initialProductInfo, constructionMaterials, styles, riderWeights, riderSkillLevels, disciplines }