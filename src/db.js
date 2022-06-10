const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        mongoose.connect(`${process.env.DB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(process.env.DB_URI)
        console.log('Successfully connected to database')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    connectDb
}