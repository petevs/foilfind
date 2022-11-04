export const filterListingsReducer = (arr, filters) => {

    const filteredArr = arr.reduce((acc, curr) => {

        if(filters.onlineShop && !curr.shoppingOptions.orderOnline){
            return acc
        }

        if(filters.storefront && !curr.shoppingOptions.shopInStore){
            return acc
        }

        if(filters.lessons && !curr.services.lessons){
            return acc
        }

        if(filters.rentals && !curr.services.rentals){
            return acc
        }

        if(filters.featured && !curr.featured){
            return acc
        }

        acc.push(curr)
        return acc

    }, [])

    // sort by featured and then by name
    const sortedArr = filteredArr.sort((a, b) => {
        if(a.featured && !b.featured){
            return -1
        } else if(!a.featured && b.featured){
            return 1
        } else {
            return a.name.localeCompare(b.name)
        }
    })

    return sortedArr

}