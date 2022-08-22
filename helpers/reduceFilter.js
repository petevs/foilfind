export const reduceFilter = (initialArr, filters) => {


  const filtered = initialArr.reduce( (prev, curr) => {

    const filtered = [...prev]

    //handle style filters
    if(!filters.style[curr.style]){
      return filtered
    }

    //If the current items brand is not set as true in the filters, then skip
    if(!filters.brands[curr.brand]){
      return filtered
    }

    filtered.push(curr)
    return filtered

  },[])

  return filtered

}