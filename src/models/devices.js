const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    model: {
        type: String,
        required: false,
        unique: true, 
    },
    SoC: {
        type: String,
        required: false,
    },
    GPU: {
        type: String,
        required: false,
    },
    CPU: {
        type: String,
        required: false,
    },
    storageCapacity: {
        type: String,
        required: false,
    },
    removableStorage: {
        type: String,
        required: false,
    },
    RAM: {
        type: String,
        required: false,
    },
    OS: {
        type: String,
        required: false,
    },
    customLauncher: {
        type: String,
        required: false,
    },
    dimensions: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    battery: {
        type: String,
        required: false,
    },
    charging: {
        type: String,
        required: false,
    },
    display: {
        type: String,
        required: false,
    },
    camera: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    cameraFront: {
        type: String,
        required: false,
    },
    fingerPrintScanner: {
        type: String,
        required: false,
    },
    facialRecognition: {
        type: Boolean,
        required: false,
    },
    releaseDate: {
        type: String,
        required: false
    },
    deprecated: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
})

const Device = new mongoose.model('Device', deviceSchema)

module.exports = Device