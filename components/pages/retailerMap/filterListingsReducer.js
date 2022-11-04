export const filterListingsReducer = (arr, filters) => {

    return arr.reduce((acc, curr) => {

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

        acc.push(curr)
        return acc

    }, [])
}