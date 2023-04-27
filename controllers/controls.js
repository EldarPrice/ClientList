const { writeData } = require('../files/createFile')
const { webScraper } = require('../first-phase/extractor')
const { getEmail } = require('../second-phase/on-website')
const { getFacebooksEmail } = require('../third-phase/on-facebook')

const getData = async (req, res) => {
  // const data = await Item.find({})
  const { saveFile, name, usersInput, limit } = req.query
  let queryObject = {}

  // get Values
  if (saveFile || (usersInput && limit)) {
    // devide and join for google maps
    const usersValue = usersInput.split(' ').join('+')
    const phase1 = await webScraper(usersValue, limit)
    const phase2 = await getEmail(phase1)
    const phase3 = await getFacebooksEmail(phase2)
    queryObject = phase3

    writeData(usersInput, phase3)
  }

  // return response
  res.status(200).json({ queryObject })
}

module.exports = {
  getData,
}
