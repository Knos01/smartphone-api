const express = require('express')
const { scrapingUrl }  = require('./scraping')
const { getDevices } = require('./devices')
const { connectDb } = require('./db')
require('dotenv').config();


const app = express()
const port = process.env.PORT || "8000"


try {
    connectDb()
} catch (err) {
    console.log(err)
}
 

app.get('/', (req, res) => {
    res.status(200).send("possible routes: /devices, /filters, /scraping")
})

//app.get('/scraping', scrapingUrl) Uncomment to run the scraping

app.get('/devices', getDevices)

app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

