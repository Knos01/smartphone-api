const express = require('express')
const path = require('path')
const scraping = require('./scraping')
const devices = require('./devices')
const { connectDb } = require('./db')


const app = express()
const port = process.env.PORT || "8000"

try {
    connectDb()
} catch (err) {
    console.log(err)
}

//define routes

app.get('/', (req, res) => {
    res.status(200).send("Your app works!")
})


app.get('/scraping', scraping.scrapingUrl)

app.get('/devices', devices.getDevices)


//to start server
app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

