const express = require('express')
const path = require('path')
const { scrapingUrl }  = require('./scraping')
const { getDevices, getFilters } = require('./devices')
const { connectDb } = require('./db') //import come oggetto


const app = express() //costruttore
const port = process.env.PORT || "8000"


try {
    connectDb()
} catch (err) {
    console.log(err)
}

//define routes

app.get('/', (req, res) => {
    res.status(200).send("possibile routes: /devices, /filters, /scraping")
})


//app.get('/scraping', scrapingUrl)

app.get('/devices', getDevices)

app.get('/filters', getFilters)

//to start server
app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

