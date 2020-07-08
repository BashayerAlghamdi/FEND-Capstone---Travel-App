// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const bodyParser = require('body-parser')
// Cors for cross origin allowance
const cors = require('cors');

app.use(express.static('dist'))

console.log(__dirname)

app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Post Route
app.post('/add', function (req, res) {
    projectData['city'] = req.body.city;
    console.log("POST received");
    res.send(JSON.stringify(projectData));
});
// Get Route
app.get('/all', function (req, res) {
    console.log("GET received");
    console.log(projectData);
    res.send(projectData);
});

module.exports = app;