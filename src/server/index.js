require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { Map } = require('immutable')

const rovers = [
    {
        name: "Curiosity",
        avatar: "https://www.science.org/do/10.1126/science.aan7004/abs/sn-curiosity.jpg"
    },
    {
        name: "Opportunity",
        avatar: "https://api.time.com/wp-content/uploads/2019/02/nasa-space-rover-opportunity-1.jpg?quality=85"
    },
    {
        name: "Spirit",
        avatar: "https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg"
    }
]

const roverData = Map(
    {
        Curiosity: Map({
            name: "Curiosity",
            about: "Curiosity is a car-sized rover designed to explore the crater Gale on Mars as part of NASA's Mars Science Laboratory mission. Curiosity was launched from Cape Canaveral on November 26, 2011, at 15:02 UTC and landed on Aeolis Palus inside Gale on Mars on August 6, 2012, 05:17 UTC.",
            launchDate: "26 November 2011, 8:32 pm IST",
            maxSpeed: "0.14 km/h",
            landingDate: "August 6, 2012, 05:17:57 UTC",
            cost: "250 crores USD (2012)",
            distanceCovered: "21.61 km (13.43 mi); as of 1 January 2020",
            modelUrl: "/assets/models/Curiosity.glb",
            avatar: "https://www.science.org/do/10.1126/science.aan7004/abs/sn-curiosity.jpg"
        }),
        Opportunity: Map({
            name: "Opportunity",
            about: "Opportunity, also known as MER-B or MER-1, and nicknamed 'Oppy', is a robotic rover that was active on Mars from 2004 until the middle of 2018",
            launchDate: "8 July 2003, 8:48 am IST",
            maxSpeed: "0.18 km/h",
            landingDate: "January 25, 2004, 05:05 UTC SCET; MSD 46236 14:35 AMT",
            cost: "40 crores USD",
            distanceCovered: " 45.16 km (28.06 mi)",
            modelUrl: "/assets/models/Opportunity.glb",
            avatar: "https://api.time.com/wp-content/uploads/2019/02/nasa-space-rover-opportunity-1.jpg?quality=85"
        }),
        Spirit: Map({
            name: "Spirit",
            about: "Spirit, also known as MER-A or MER-2, is a robotic rover on Mars, active from 2004 to 2010. It was one of two rovers of NASA's Mars Exploration Rover Mission.",
            launchDate: "10 June 2003, 11:28 pm IST",
            maxSpeed: "0.18 km/h",
            landingDate: "January 4, 2004, 04:35 UTC SCET; MSD 46216 03:35 AMT",
            cost: "40 crores USD",
            distanceCovered: "-",
            modelUrl: "/assets/models/Spirit.glb",
            avatar: "https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg"
        })
    }
)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// GET Rovers
app.get('/rovers', (req, res) => {
    res.send(rovers);
})

// GET Rover by name
app.get('/rover/:name', (req, res) => {
    const { name } = req.params;
    res.send(roverData.get(name));
})

// GET photos of rover name
app.get('/rover/:name/photos', async (req, res) => {
    const { name } = req.params;
    const { sol } = req.query;
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=${sol}&api_key=${process.env.API_KEY}`
    const data = await fetch(URL).then(res => res.json());
    res.send(data.photos);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))