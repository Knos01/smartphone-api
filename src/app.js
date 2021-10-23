const express = require('express')
const path = require('path')
const scraping = require('./scraping')

const app = express()
const port = process.env.PORT || "8000"


//define routes

app.get('/', (req, res) => {
    return res.status(200).send("Your app works!")
})

app.get('/scraping', scraping.scrapingUrl)


//to start server
app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

