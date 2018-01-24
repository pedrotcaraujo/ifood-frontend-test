import isObject from './isObject';

/**
 * Check and removes empty object properties
 * @param {object} data 
 * @returns {object}
 */
const removeEmpty = (data) => {
    if (!isObject(data)) { return data }

    Object.keys(data).forEach(key => {
        if (!data[key]) {
            delete data[key]
        }
    })

    return data
}

export default removeEmpty;