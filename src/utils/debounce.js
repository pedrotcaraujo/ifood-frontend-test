/**
 * Returns a function to be invoked with delay passed as param
 * @param {function} fn callback function to be delayed
 * @param {number} wait timeout
 * @param {boolean} immediate trigger the function on the leading edge, instead of the trailing
 * @returns {function}
 */
const debounce = (fn, wait = 100, immediate = false) => (...args) => {
    const obj = this;
    let timeout;

    const delayed = () => {
        if (!immediate) fn.apply(obj, args);
        timeout = null;
    };

    if (timeout) clearTimeout(timeout);
    else if (immediate) fn.apply(obj, args);

    timeout = setTimeout(delayed, wait);
};
  
export default debounce;