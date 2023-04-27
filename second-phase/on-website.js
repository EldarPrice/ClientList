const puppeteer = require('puppeteer')
const {
  TimeoutError,
} = require('puppeteer-core/lib/cjs/puppeteer/common/Errors.js')

async function getEmail(data) {
  console.log('ON-WEBSITES: Searching for email, facebook, instagram...')
  try {
    // maping urls and removing unclicables
    let urls = data.filter((item) => {
      const { web } = item
      return (
        !web.startsWith('//') &&
        !web.startsWith('no website') &&
        !web.startsWith('/aclk') &&
        !web.startsWith('google') &&
        !web.startsWith('https://www.facebook.com') &&
        !web.startsWith('http://facebook.com')
      )
    })
    // looping through and checking each web for requested info
    for (const object of urls) {
      const { web, id, name } = object
      const browser = await puppeteer.launch({ headless: true })

      try {
        const page = await browser.newPage()

        const response = await page.goto(web, { waitUntil: 'networkidle0' })

        await page.waitForSelector('body', { timeout: 15000 })

        if (response.status() < 400) {
          const dataRaw = await page.evaluate(async () => {
            const bodyOuter =
              document.querySelector('body').outerHTML || 'no body'
            const body = bodyOuter

            // find email, facebook, instagram
            const email = body.match(
              /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim
            ) || ['not found']
            const facebook = body.match(
              /www.facebook.(?:com|net)(\/\w+=?)/gi
            ) || ['not found']
            const instagram = body.match(
              /www.instagram.(?:com|net)(\/\w+=?)/gi
            ) || ['not found']
            return { email: email, facebook: facebook, instagram: instagram }
          })
          console.log(`ID: ${id} 
                       name: ${name}
                       web: ${web}                
                       facebook: ${dataRaw.facebook[0]}
                       instagram: ${dataRaw.instagram[0]}
                       email: ${dataRaw.email}
                      `)
          object.email = dataRaw.email[0]
          object.facebook = dataRaw.facebook[0]
          object.instagram = dataRaw.instagram[0]
        } else {
          continue
        }
      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error('The element did not appear within 30 seconds.')
          await browser.close()
          continue
        } else if (
          error.message.includes('NET::ERR_CERT_COMMON_NAME_INVALID')
        ) {
          console.log(`Error: ${error.message}. Skipping to the next website.`)
          await browser.close()
          continue
        } else {
          console.log(error)
          console.log('error is in ELSE STATEMENT')
          continue
        }
      }

      await browser.close()
    }
    console.log('Finished Loading Emails, Facebook, Instagram From Websites')

    return urls
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getEmail }
