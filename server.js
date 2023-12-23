const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const router = require('./Routers/routerOrder')
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get('/users', router);
app.post('/users', router);
app.put('/users', router);
app.delete('/users/:id', router);

app.listen(8000, () => {
    console.log("Server started at port 8000")
})