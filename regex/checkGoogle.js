const reGexToJSON = (value, regex, type) => {
  /* optional regex check */

  let regexResult = value

  if (regex === 'https/g') {
    /** check for https value
     * not containing word google/ssl.gstatic
     * ending with (.) + 2-3 characters
     * not containing .png at the end
     */
    const regexCheck =
      /(https:\/\/(www\.)(?!google)(?!ssl)(.*?)\S(\.[a-z]{2,3}\b))/gim
    /* pass data */
    regexResult = regexResult.match(regexCheck)
  }

  if (regex === 'https') {
    /* regex check for https:// followed by any char and ending with dot + 2-3 chars */
    const regexCheck = /(https:\/\/(www\.)(.*?)\S\.((?!png)[a-z]{2,3}\b))/gim
    regexResult = regexResult.match(regexCheck)
  }
  return regexResult
}


module.exports = { reGexToJSON }

/**
 * value = string for check
 * options = array, objects, text
 * regex = what type of regular expression used on method
 *      - https = checks for http followed by '.'dot and plus 3 letter symbols
 *      - https/g = checks for https:// followed by .com and empty space.
 *             .not including phrases (www.google.com) and (ssl.gstatic.com) and removing last 2 characters
 *      - email = checks for https:// followed by @ sign and ending with 3 letter symbols after .(dot)
 *
 */
