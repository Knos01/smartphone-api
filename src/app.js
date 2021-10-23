const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || "8000"


//define routes

app.get('/', (req, res) => {
    return res.status(200).send("Your app works!")
})


//to start server
app.listen(port, () => {
    console.log(`Server starts at port ${port}`)
})

