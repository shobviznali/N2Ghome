const express = require("express");
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const router = express.Router();

const jsonData = require(path.resolve('./data-s/data.json'));


router.get('/users', (req, res) => {
    const parsedData = JSON.parse(fs.readFileSync('./data-s/data.json', "utf-8"));
    res.json(parsedData)
})

router.post('/users', (req, res) => {
    
    const jsonData = fs.readFileSync('./data-s/data.json', 'utf-8');
    const existingData = JSON.parse(jsonData);

    const newUser = req.body;


    existingData.push(newUser);

    fs.writeFileSync('./data-s/data.json', JSON.stringify(existingData, null, 2), 'utf-8');


    res.json({ message: 'User added successfully' });

    
})

router.put('/users', (req, res) => {
    const name = req.query.name;

    const nameExists = jsonData.some(user => user.name === name)
    const userIndex = jsonData.findIndex(user => user.name === name);


    if(nameExists) {
        jsonData[userIndex].surname = req.body.surname;
        console.log(jsonData);
        
        res.json({ message: 'Surname was changed' });
        
        fs.writeFileSync('./data-s/data.json', JSON.stringify(jsonData, null, 2))
    }else{
        res.json({ message: `Name ${name} doesn't exists` });
    }


    // res.send('good')
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const indexToRemove = jsonData.findIndex(item => item.id === id);
    jsonData.splice(indexToRemove, 1);
    console.log(jsonData);
    fs.writeFileSync('./data-s/data.json', JSON.stringify(jsonData, null, 2));
    res.json({message: "User was deleted"})
});
// console.log();

module.exports = router;