const express = require("express");
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.listen(8000)

app.get('/users', (req, res) => {
    
    const parsedData = JSON.parse(fs.readFileSync('data.json', "utf-8"));
    res.json(parsedData)
})

app.post('/users', (req, res) => {
    
    const jsonData = fs.readFileSync('data.json', 'utf-8');
    const existingData = JSON.parse(jsonData);

    const newUser = req.body;


    existingData.push(newUser);

    fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2), 'utf-8');


    res.json({ message: 'User added successfully' });

    
})
// console.log();

