require('dotenv').config()
const mongoose = require('mongoose')


const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)