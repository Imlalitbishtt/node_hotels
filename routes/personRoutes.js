const express = require('express')
const router = express.Router();
const Person = require('../models/person');

//POST route to add a person
router.post('/', async (req, res) => {
    try{
        const data = req.body //Assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved', response.name);
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Get all person
router.get('/', async(req, res) =>{
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Get specific person according to work type
router.get('/:workType', async(req, res)=> {
    try{
        const workType = req.params.workType;   //Extract the workType from the URL paramter
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work : workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Update person data
router.put('/:id', async(req, res) =>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPersonData = req.body;     //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });

        if(!response){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('Data updated for', response.name);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//Delete 
router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id;       
        const response = await Person.findByIdAndDelete(personId);
        
        if(!response){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('Data deleted for', response.name);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;