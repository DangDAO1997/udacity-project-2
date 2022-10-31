require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// GET Rovers
app.get('/rovers', async (req, res) => {
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`;
    const data = await fetch(URL).then(res => res.json());
    res.send(data.rovers);
})

// GET Rover by name
app.get('/rover/:name', async (req, res) => {
    const { name } = req.params;
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}?api_key=${process.env.API_KEY}`;
    const data = await fetch(URL).then(res => res.json());
    res.send(data.rover)
})

// GET photos of rover name
app.get('/rover/:name/photos', async (req, res) => {
    const { name } = req.params;
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/latest_photos?api_key=${process.env.API_KEY}`;
    const data = await fetch(URL).then(res => res.json());
    res.send(data.latest_photos);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))