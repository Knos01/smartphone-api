const Device = require('./models/devices')
const regexFilters = ['OS', 'releaseDate', 'model']
const rangeFilters = 
    [
        { 'RAM': ['1-2 GB', '2-4 GB', '4-6 GB', '8-12 GB', '16-32 GB']}, 
        {'camera': ['4-8 MP', '8-12 MP', '12-16 MP', '16-20 MP', '20-48 MP']},
        {'storageCapacity': ['16-32 GB', '32-64 GB', '64-128 GB', '128-256 GB', '256-512 GB']},
    ]
const booleanFilters = ['removableStorage']

const getDevices = async (req, res) => {
    try { 
        let query = Device.find()
        query.where('deprecated', null)
        
        applyRegexFilters(req, query)
        applyBooleanFilters(req, query)
        applyRangeFilters(req, query)

        const devices = await query.exec()

        res.status(200).json(devices)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.toString() })
    }
}

const applyRegexFilters = async (req, query) => {
    regexFilters.forEach(filter => {
        if (req.query[filter]) {
            query.where(filter).regex(new RegExp(req.query[filter], 'i'))
        }
    })
}

const applyBooleanFilters = async (req, query) => {
    booleanFilters.forEach(filter => {
        if (req.query[filter]) {
            query.where(filter).ne('None')
        }
    })
}

const applyRangeFilters = async (req, query) => {
    rangeFilters.forEach(f => {
        currentFilter = Object.keys(f)[0]
        if (req.query[currentFilter] && f[currentFilter].includes(req.query[currentFilter])) {
            values = req.query[currentFilter]

            let start = values.split('-')[0]
            let end = values.split('-')[1].split(' ')[0]
            let unit = values.split(' ')[1]
            
            query.where(currentFilter).regex(new RegExp(`(^${start} ${unit})|(.*\/${start} ${unit})|(^${end} ${unit})|(.*\/${end} ${unit})`)) 
       
        }
    })
}


module.exports = {
    getDevices
}