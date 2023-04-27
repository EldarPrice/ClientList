const puppeteer = require('puppeteer')
const {
  TimeoutError,
} = require('puppeteer-core/lib/cjs/puppeteer/common/Errors.js')

async function webScraper(usersValue, limit) {
  try {
    const url = `https://www.google.com/maps/search/${usersValue}`

    const pathToList = `#content-container > :nth-child(9) > div > div > div > :nth-child(2) > div > div > div > div > :nth-child(2) > div`
    const fromListToLink = `> div > div > :nth-child(4) > :nth-child(2) > div > a`

    limit = limit || 100

    console.log('Loading websites...')

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url)

    const businessData = await page.evaluate(
      async (pathToList, fromListToLink, limit) => {
        let itemCount = document.querySelector(pathToList).childElementCount
        let selector = document.querySelector(
          `${pathToList} > :nth-child(${itemCount})`
        )

        // wait for full list-load
        await new Promise((resolve) => {
          const scroller = setInterval(() => {
            if (itemCount < limit * 2) {
              selector.scrollIntoView(true)
              itemCount++
            } else {
              clearInterval(scroller)
              resolve()
            }
          }, 100)
        })

        let elements = []

        // iterate through DOM and extact values
        for (let i = 3; i < itemCount; i += 2) {
          let id = 1

          const nameElement = document.querySelector(
            `${pathToList} > :nth-child(${i}) > div`
          )

          const linkElement = document.querySelector(
            `${pathToList} > :nth-child(${i}) ${fromListToLink}`
          )

          // trim unnessesary values
          let rinsedLink = 'no website'
          let nameStatic = 'no name'

          // push to Array if name and link exist
          if (nameElement && linkElement) {
            rinsedLink = linkElement.getAttribute('href') || rinsedLink
            nameStatic = nameElement.getAttribute('aria-label') || nameStatic

            elements.push({
              name: nameStatic,
              web: rinsedLink,
              id: (id += (i - 3) / 2),
            })
          }
        }
        return elements
      },
      pathToList,
      fromListToLink,
      limit
    )

    await browser.close()
    console.log('Finished loading websites.')
    return businessData
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error('The element did not appear within 30 seconds.')
      await browser.close()
    } else if (error.message.includes('NET::ERR_CERT_COMMON_NAME_INVALID')) {
      console.log(`Error: ${error.message}. Skipping to the next website.`)
      await browser.close()
    } else {
      console.log(error)
      console.log('error is in ELSE STATEMENT')
    }
  }
}
module.exports = { webScraper }

/**
 * NOTE:
 * Google maps DOM TREE changed DOM schema on February 17-18, 2023
 * Before link could be found by this selector:
 *
 * document.querySelector('
 * #content-container > :nth-child(9) > div > div > div
 * > :nth-child(2) > div > div > div > div > :nth-child(2) > div
 * > div > :nth-child(3) > :nth-child(--->2<---) > :nth-child(2) > div > a')
 * .getAttribute('href')
 *
 * CHANGED TO:
 *
 * document.querySelector('
 * #content-container > :nth-child(9) > div > div > div
 * > :nth-child(2) > div > div > div > div > :nth-child(2) > div
 * > div > :nth-child(3) > :nth-child(--->3<---) > :nth-child(2) > div > a')
 *
 * Selector changed causing app to crush, and could't find href attribute
 * Fixed by changing selector.
 *
 * Should look for further changes....
 *
 *
 * NOTE:
 * Google maps DOM TREE changed DOM schema on March 5, 2023 (date when changes found by developer)
 * Before link could be found by this selector:
 *
 *  * document.querySelector('
 * #content-container > :nth-child(9) > div > div > div
 * > :nth-child(2) > div > div > div > div > :nth-child(2) > div
 * > div > :nth-child(3) > :nth-child(--->3<---)                 <-- old version (valid on February 17-18, 2023)
 * > :nth-child(2) > div > a')                      <-- unchanged
 *
 * Changed To:
 *
 * document.querySelector('
 * #content-container > :nth-child(9) > div > div > div
 * > :nth-child(2) > div > div > div > div > :nth-child(2) > div
 * > :nth-child(3) > div > div > :nth-child(4)                   <-- new version (valid on March 5, 2023)
 *  ----this section completely changed -----
 * ---- removed first div, added 3 addittional children, added div, added 4th child -----
 *  > :nth-child(2) > div > a')                     <-- unchanged
 *
 *
 * DOM Changes accured twice during month, should trach further changes, extract data while can, and maybe
 * implement Regex on TOP level instead...
 *
 * If accures again will try to implement REGEX check on parent element to extract
 * needed link to website.
 */

/**  Possible DOM path-modifications:
      * document.querySelector('#content-container > :nth-child(9) > div > div > div > :nth-child(2) > div > div > div > div > :nth-child(2) > div >
     :nth-child(3) > div > div > :nth-child(4) > :nth-child(2) > div > a')
      * const fromListToLink = `> div > :nth-child(3) > :nth-child(3) > :nth-child(2) > div > a` */
