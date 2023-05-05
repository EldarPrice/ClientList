const errorHandler = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).send({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandler
