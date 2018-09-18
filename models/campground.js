var mongoose = require("mongoose")


// Define schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Comment'
            }
        ]
})

// Define and export model to be used from app.js
module.exports = mongoose.model('Campground', campgroundSchema)