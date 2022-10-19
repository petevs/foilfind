export const handleCondition = (item, condition) => {

    if(condition.value === 'true' || condition.value === 'false') {
        return item[condition.field] === (condition.value === 'true')
    }

    if(condition.operator === 'is') {
        return item[condition.field] === condition.value
    }

    if(condition.operator === 'is not') {
        return item[condition.field] !== condition.value
    }

    if(condition.operator === 'contains') {
        return item[condition.field].includes(condition.value)
    }

    if(condition.operator === 'does not contain') {
        return !item[condition.field].includes(condition.value)
    }

    if(condition.operator === 'starts with') {
        return item[condition.field].startsWith(condition.value)
    }

    if(condition.operator === 'ends with') {
        return item[condition.field].endsWith(condition.value)
    }

    if(condition.operator === 'is greater than') {
        return item[condition.field] > condition.value
    }

    if(condition.operator === 'is less than') {
        return item[condition.field] < condition.value
    }

    if(condition.operator === 'is empty') {
        return item[condition.field] === ''
    }

    if(condition.operator === 'is not empty') {
        return item[condition.field] !== ''
    }

    if(condition.operator === '=') {
        return item[condition.field] === condition.value
    }

    if(condition.operator === '!=') {
        return item[condition.field] !== condition.value
    }

    if(condition.operator === '>') {
        return item[condition.field] > condition.value
    }

    if(condition.operator === '>=') {
        return item[condition.field] >= condition.value
    }

    if(condition.operator === '<') {
        return item[condition.field] < condition.value
    }

    if(condition.operator === '<=') {
        return item[condition.field] <= condition.value
    }

    return false
}

export const handleConditions = (item, conditions) => {

    if(conditions.length === 0) {
        return true
    }

    if(conditions.length <= 1) {
        return handleCondition(item, conditions[0])
    }

    if(conditions[1].logical === 'and') {
        const pass = conditions.every( condition => handleCondition(item, condition))
        return pass
    }

    if(conditions[1].logical === 'or') {
        const pass = conditions.some( condition => handleCondition(item, condition))
        return pass
    }

}  


export const filterList = (all, conditions) => {

    const filtered = all.reduce((acc, item) => {

        if(handleConditions(item, conditions)) {
            acc.push(item)
        }

        return acc

    },[])

    return filtered

}