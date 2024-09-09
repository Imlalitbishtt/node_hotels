const mongoose = require('mongoose');

//Define the menu schema
const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true      
    },
    price:{
        type: Number
    },
    taste:{
        type: String,
        enum:['spicy', 'sweet', 'sour'],
        required: true
    },
    ingredients:{
        type: [String],
        default: []
    },
    sales:{
        type: Number,
        default: 0
    }
})

//Create Menu model
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;