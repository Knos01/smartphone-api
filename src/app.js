const express = require('express')
const path = require('path')
const scraping = require('./scraping')

const app = express()
const port = process.env.PORT || "8000"


//define routes

app.get('/', (req, res) => {
    res.status(200).send("Your app works!")
})


app.get('/scraping', scraping.scrapingUrl)


/* 

let test = Test()

let person = {
    name: 'John',
    age: 8
}

person['name']
person.name

*/


//to start server
app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

