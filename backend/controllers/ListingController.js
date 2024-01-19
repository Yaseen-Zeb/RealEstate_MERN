const ListingsModel = require("../models/ListingModel.js");

let createListing = async (req, res) => {

  try {
    let isSameTitle = await ListingsModel.findOne({ "title": req.body.title })
    if (isSameTitle) {
      res.send({
        "result": "error", "message": 'Listing Title Already Exist',
      })
    } else {
      let images = [];
      req.files.forEach(file => {
        images.push(file.filename)
      });
      let newListing = await new ListingsModel({
        "title": req.body.title,
        "description": req.body.description,
        "address": req.body.address,
        "type": req.body.type,
        "bedrooms": req.body.bedrooms,
        "bathrooms": req.body.bathrooms,
        "price": req.body.price,
        "parking": req.body.parking,
        "offer": req.body.offer,
        "images": images,
        "userRef": req.body.userRef,
      }).save();
      res.send({
        "result": "success", "message": 'New listing created successfully',
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
};


let updateListing = async (req, res) => {
  try {
      let images = [];
      let savedImages = req.body.savedImages.split(",").filter(value => value !== '')
      let totalImages = req.body.totalImages.split(",").length
      let updateImages = req.body.updateImages.split(",").filter(value => value !== '').sort((a, b) => a - b);
      init = 0
      for (let i = 0; i < totalImages; i++) {

        if (updateImages.includes(updateImages[init])) {

          if (i === Number(updateImages[init])) {
            console.log("yes");
            images.push(req.files[init].filename)
            init++;
          } else {
            images.push(savedImages[i])
          }
        } else {
          images.push(savedImages[i])
        }
      }

      let listing = await ListingsModel.findByIdAndUpdate(req.params.id,
        {
          $set: {
            "title": req.body.title,
            "description": req.body.description,
            "address": req.body.address,
            "type": req.body.type,
            "bedrooms": req.body.bedrooms,
            "bathrooms": req.body.bathrooms,
            "price": req.body.price,
            "parking": req.body.parking,
            "offer": req.body.offer,
            "images": images,
            "userRef": req.body.userRef,
          }
        }, { new: true })

      res.send({
        "result": "success", "message": 'Updated successfully',
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
};

let userListing = async (req, res) => {
  try {
    let userListings = await ListingsModel.find({ userRef: req.body.id })
    res.send({
      "result": "success", "message": 'Loged successfully',
      "data": userListings
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
}

let removeListing = async (req, res) => {
  try {
    const listing = await ListingsModel.findById(req.params.id);
    if (!listing) {
      res.status(400).json({
        result: 'error',
        message: 'Listing not found!',
      });
    } if (req.params.userRef !== listing.userRef) {
      res.status(200).json({
        result: 'error',
        message: 'You can only delete own listing!'
      });
    }
    await listing.deleteOne();
    res.json({
      result: 'success',
      message: 'Listing removed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
};

let Listing = async (req, res) => {
  try {
    const fetchData = await ListingsModel.findOne({ _id: req.params.id });

    if (!fetchData) {
      return res.status(200).json({
        result: '404',
        message: 'Listing not found',
      });
    }

    return res.status(200).json({
      result: 'success',
      data: fetchData,
    });
  } catch (error) {
    console.error(error);

    // Handle specific Mongoose errors
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(200).json({
        result: '404',
        message: 'Listing not found',
      });
    }

    return res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
};





module.exports = { createListing, updateListing, userListing, removeListing, Listing }