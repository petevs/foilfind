const convertToToday = (seconds) => {
    const date = new Date(seconds * 1000);
    const today = new Date();
    today.setHours(date.getHours());
    today.setMinutes(date.getMinutes());
    today.setSeconds(date.getSeconds());
    return today;
};

  const checkIfOpen = (listing) => {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    const date = new Date();
    const dayNum = date.getDay();
    const day = daysOfTheWeek[dayNum].toLowerCase();

    const open = convertToToday(listing.hours[day].open.seconds);
    const close = convertToToday(listing.hours[day].close.seconds);
    const now = date
    
    if(listing.hours[day].closed === true){
        return false
    }

    return now > open && now < close 

  }



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

        if(filters.openNow && !checkIfOpen(curr)){
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