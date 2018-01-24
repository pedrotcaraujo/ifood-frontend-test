// Match between a value and search string
const fuzzySearch = (value, search) => {       
    if (!search) { return true };
    const re = new RegExp(search, 'i');
    return value.match(re)
}

export default fuzzySearch;