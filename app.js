require('express-async-errors')

const express = require('express')
const app = express()

// const connectDB = require('./db/connect')
const dataRouter = require('./router/routes')

const port = 5000

const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/error-handler')

// middleware

app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Business List API</h1><a href="/api/v1/rawData">List of bussineses'
    )
})

app.use('/api/v1/', dataRouter)

// business list

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
