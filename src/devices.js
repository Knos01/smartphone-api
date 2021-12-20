const Device = require('./models/devices')

const getDevices = async (req, res) => {
    try {
        const availableFilters = ['OS', 'RAM', 'camera', 'cameraFront', 'display', 'charging', 
                                  'removableStorage', 'battery', 'storageCapacity', 'releaseDate', 'model'] 
        
        let query = Device.find() // SELECT * FROM DEVICES

        for (let i = 0; i < availableFilters.length; i++) {
            if (req.query[availableFilters[i]]) {
                //search by contains
                query.where(availableFilters[i], new RegExp(req.query[availableFilters[i]], 'i'))
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