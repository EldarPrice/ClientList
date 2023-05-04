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
