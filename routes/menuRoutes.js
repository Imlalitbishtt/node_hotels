const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

//Post (add) data into menu
router.post('/', async (req, res) => {
    try{
        const data = req.body;  //get the data through body
        const newMenu = new Menu(data);     //create new menu data through Menu Model

        const response = await newMenu.save();  //save data to the database

        console.log('Data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Get all the data from Menu
router.get('/', async(req, res) => {
    try{
        const data = await Menu.find(); //find all the menu data
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Get specific menu item according to taste
router.get('/taste/:taste', async (req, res) => {
    try{
        const tasteType = req.params.taste; //Get the taste type through URL parameter
        if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour'){
            const data = await Menu.find({taste : tasteType});
            console.log('Data fetched', tasteType);
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Get menu item through id
router.get('/name/:name', async(req, res) => {
    try{
        const menuItemName = req.params.name;
        const response = await Menu.find({name : menuItemName});
        console.log('Data fetched for', menuItemName);
        res.status(200).json(response);

        if(!response){
            res.status(404).json({error: 'MenuItem not found'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


//Update Menu item
router.put('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;   //Get the id through URL parameter
        const updatedMenuData = req.body;   //Updated Data from body

        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        });

        if(!response){
            res.status(404).json({error: 'MenuItem not found'});
        }

        console.log('Data updated for', response.name);
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


//Delete Menu Item
router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);

        if(!response){
            res.status(404).json({error: 'Menu Item not found'});
        }

        console.log('Data deleted for', response.name);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;