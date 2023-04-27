const express = require('express')
const router = express.Router()

const { getData } = require('../controllers/controls')

router.route('/').get(getData)

module.exports = router
