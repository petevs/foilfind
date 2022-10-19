export const checkIfPositionInViewport = (lat, lng, bounds) => {
  return (lat >= bounds._sw.lat && lat <= bounds._ne.lat && lng >= bounds._sw.lng && lng <= bounds._ne.lng);
}