export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

export const toKebabCase = (str) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

// create a function that takes in a string and returns a kebab case string

export const createSlug = (str) => {
    return str.toLowerCase().replaceAll(' ', '-');
}

// sort array of strings
export const sortArray = (arr) => {
    return arr.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
}

export const camelToTitleCase = (str) => {
    return str.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
}
