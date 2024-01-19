const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    default: 1,
    required: true
  },
  bathrooms: {
    type: Number,
    default: 0,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  parking: {
    type: Boolean,
    required: true
  },
  offer: {
    type: Boolean
  },
  images: {
    type: Array,
    required: true
  },
  userRef: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Corrected option name

const CreateListingModel = mongoose.model('Listing', listingSchema);

module.exports = CreateListingModel;
