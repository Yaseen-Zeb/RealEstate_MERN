const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require("./routes/routes.js");

const app = express();
app.use('/public/images', express.static('public/images'));
app.use(cors());
app.use(express.json());
const port = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/realestate");
app.use('/api',Router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
