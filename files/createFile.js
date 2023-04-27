const fs = require('fs')

async function writeData(usersInput, phase3) {
  try {
    const fileName = usersInput.split(' ').join('-') + '.txt'

    const resultInfo = phase3
      .map((item, index) => {
        const { name, web, email, instagram, facebook } = item
        return `
ID: ${index + 1}
  Name: ${name}
  Web: ${web}
  Facebook: ${facebook}
  Instagram: ${instagram}
  Email: ${email}`
      })
      .toString()

    // create text-file
    fs.writeFile(
      `./Marketing\ Data\/${fileName}`,
      resultInfo,
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666,
      },
      (err) => {
        if (err) console.log(err)
        else {
          console.log('File was written successfully')
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = { writeData }
