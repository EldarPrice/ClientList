const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
  website: {
    type: String,
    required: [true, 'please provide web address'],
  },
  name: {
    type: String,
    required: [false, 'Company name must be provided'],
    default: '',
  },
  id: {
    type: Number,
    required: [false],
  },
  email: {
    type: String,
    default: '',
    required: [false, 'please provide correct email'],
  },
  emailPresent: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: String,
    default: '',
  },
  facebookFollow: {
    type: Number,
    default: 0,
  },
  instagram: {
    type: String,
    default: '',
  },
  instagramFollow: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Item', itemsSchema)
