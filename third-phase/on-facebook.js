const puppeteer = require('puppeteer')
const {
  TimeoutError,
} = require('puppeteer-core/lib/cjs/puppeteer/common/Errors.js')

async function getFacebooksEmail(data) {
  console.log('ON-FACEBOOK: Searching for Emails')
  try {
    // looping through and checking for email, if not exist
    for (const object of data) {
      const browser = await puppeteer.launch({ headless: true })
      const { facebook, id, web, instagram, name } = object
      // handle if facebook == "not found"
      if (facebook !== 'not found') {
        if (object.email === 'not found') {
          try {
            const page = await browser.newPage()
            const linkToFacebook = 'https://' + facebook

            const response = await page.goto(linkToFacebook, {
              waitUntil: 'networkidle0',
            })

            await page.waitForSelector('body', { timeout: 15000 })

            if (response.status() < 400) {
              const dataRaw = await page.evaluate(async () => {
                const body = document.querySelector('body')
                if (body.children.length > 0) {
                  const pathToEmail = document.querySelector(
                    'body> div > div > div > div > :nth-child(5) > div > div > div > div > div'
                  )

                  // check block for email
                  const email = pathToEmail.innerHTML.match(
                    /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim
                  ) || ['not found']

                  if (email) {
                    return { email: email }
                  } else {
                    return { email: email }
                  }
                } else {
                  return { email: ['Facebooks error'] }
                }
              })
              console.log(`ID: ${id}
                                  name: ${name}
                                  web: ${web}
                                  facebook: ${facebook}
                                  instagram: ${instagram}
                                  email: ${dataRaw.email[0]}
                                  `)
              object.email = dataRaw.email[0]
            } else {
              await browser.close()
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
              console.log(
                `Error: ${error.message}. Skipping to the next website.`
              )
              await browser.close()
              continue
            } else {
              console.log(error)
              console.log('error is in ELSE STATEMENT')
              await browser.close()
              continue
            }
          }
        }
      }
      await browser.close()
    }
    console.log('Finished Loading Emails from Facebook.')
    console.log('FINISHED LOADING DATA!!')
    return data
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getFacebooksEmail }
