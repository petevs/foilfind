import { Box, Select } from "@mantine/core"
import useFoilKitForm from "./useFoilKitForm"

const initialFoilKitSpecs = {
  style: '',
  riderWeight: {
    heavy: false,
    medium: false,
    light: false,
  },
  riderSkillLevel: {
    advanced: false,
    intermediate: false,
    beginner: false,
  },
  constructionMaterial: '',
  disciplines: {
    'wing': false,
    'kite': false,
    'wake': false,
    'surf': false,
    'tow': false,
  },
  frontWing: {
    areaCM: 0,
    weightGrams: 0,
    wingSpanMillimeters: 0,
    ar: 0,
  },
  tailWing: {
    areaCM: 0,
    weightGrams: 0,
    wingSpanMillimeters: 0,
  },
  fuesalage: {
    lengthCM: 0,
    weightGrams: 0,
  },
  mast: {
    lengthCM: 0,
    weightGrams: 0,
    constructionMaterial: ''
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


export default function FoilKitSpecs(){


  return (
    <Box>
      <Select
        label='Style'
        placeholder='Select style'
        data={styles}
      />
      <Select
        label='Construction Material'
        placeholder='Select construction material'
        data={constructionMaterials}
      />
    </Box>
  )
}