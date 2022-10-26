import { TextInput } from "@mantine/core"
import { useState } from "react"

const useFormTest = () => {

  const [formState, setFormState] = useState({
    name: '',
    category: '',
  })

  const handleChange = (e, name) => {
    setFormState({
      ...formState,
      [name]: e.currentTarget.value
    })
  }

  const TestForm = () => {
    return(
      <>
        <TextInput
          label='Name'
          placeholder='Enter name'
          value={formState.name}
          onChange={(e) => handleChange(e, 'name')}
          required
        />
        <TextInput
          label='Category'
          placeholder='Enter category'
          value={formState.category}
          onChange={(e) => handleChange(e, 'category')}
          required
        />
      </>
    )
  }

  return {
    formState,
    TestForm
  }
}

export default useFormTest