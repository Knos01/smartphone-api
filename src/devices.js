const Device = require('./models/devices')

const getDevices = async (req, res) => {
    try {
        const availableFilters = ['OS', 'RAM']
        
        let query = Device.find()

        for (let i = 0; i < availableFilters.length; i++) {
            if (req.query[availableFilters[i]]) {
                query.where(availableFilters[i], req.query[availableFilters[i]])
            }
        }

        const devices = await query.exec()

        res.status(200).json(devices)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.toString() })
    }
}

module.exports = {
    getDevices
}