// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')

const app = express()
const bodyParser = require('body-parser')
// Cors for cross origin allowance
const cors = require('cors');

app.use(express.static('dist'))

app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})
app.listen(8050, function () {
    console.log('Running on port 8050!')
})
// Post Route
app.post('/add', function (req, res) {
    projectData['country'] = req.body.country;
    projectData['place'] = req.body.place;
    projectData['latitude'] = req.body.latitude;
    projectData['longitude'] = req.body.longitude;
    projectData['startdate'] = req.body.startdate;
    projectData['enddate'] = req.body.enddate;
    projectData['image'] = req.body.image;
    console.log("POST received");
    res.send(JSON.stringify(projectData));
});
// Get Route
app.get('/all', function (req, res) {
    console.log("GET received");
    console.log(projectData);
    res.send(JSON.stringify(projectData));
});

module.exports = app;