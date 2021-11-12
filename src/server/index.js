var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const dotenv = require('dotenv');
// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

app.use(cors());
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// Setup Server
const port = process.env.PORT || 8081;

const serverCallback = () => {
    console.log(`Server is up and running. Listening on http://localhost:${port}`);
}

app.listen(port, serverCallback);

app.post('/api', async(req, res) => {
    userInput = req.body.url;
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${userInput}`);  
    try {
        const data = await response.json();
        res.send(data);
    } catch(error) {
        console.log("error", error);
    }
});