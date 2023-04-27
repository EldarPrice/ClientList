require('dotenv').config()

const connectDB = require('./db/connect')
const Item = require('./models/Item')

const jsonLinks = require('./find/links.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Item.deleteMany()
    await Item.create(jsonLinks)
    console.log('New list RINSED & CREATED')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()
