export const geocodeAddress = async (address) => {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_API_KEY}`)
    const data = await response.json()
    const { lat, lng } = data.results[0].geometry
    const place = data.results[0].components
    console.log([lat, lng])
    return [ lat, lng]

  }