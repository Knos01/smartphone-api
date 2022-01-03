const Device = require('./models/devices')
const availableFilters = ['OS', 'RAM', 'camera', 'cameraFront', 'display', 'charging', 
                          'removableStorage', 'battery', 'storageCapacity', 'releaseDate']

const getDevices = async (req, res) => {
    try { 
        
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

const getFilters = async (req, res) => {
    try {

        let query;
        let devices;
        let result = {};

        for (let i = 0; i < availableFilters.length; i++) {
            query = Device.find()
            query.distinct(availableFilters[i])
            devices = await query.exec()
            result[availableFilters[i]] = devices
        }

        res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.toString() })
    }
}

module.exports = {
    getDevices,
    getFilters
}