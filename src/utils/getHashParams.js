  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  const getHashParams = () => {
    const hashParams = {};
    window.location.hash.substring(1).split('&').forEach(p => {
        const param = p.split('=');
        hashParams[param[0]] = decodeURIComponent(param[1]);
    })
    return hashParams;
}

export default getHashParams;