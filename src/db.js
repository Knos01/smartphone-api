const mongoose = require('mongoose')

const uri = "mongodb+srv://test:Phonetasticu14@cluster0.aooym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        console.log(err)
    }
}



module.exports = {
    connectDb
}