const request = require('request-promise');
const cheerio = require('cheerio');
const tableParser = require('cheerio-tableparser');
const url = 'https://en.wikipedia.org/wiki/Comparison_of_smartphones';
const Device = require('./models/devices')


const scrapingUrl = async (req, res) => {
    try {
        const html = await request(url)
        const $ = cheerio.load(html)

        tableParser($);
        let tbody = $('.wikitable > tbody')
        let parsedTableData = tbody.parsetable(true, true, true);
        let revertedTable = parsedTableData[0].map((_, colIndex) => parsedTableData.map(row => row[colIndex]));

        let data = []

        for (let i = 1; i < revertedTable.length; i++) {
            let device = {}
            device.model = revertedTable[i][0]
            device.SoC = revertedTable[i][1]
            device.GPU = revertedTable[i][2]
            device.CPU = revertedTable[i][3]
            device.storageCapacity = revertedTable[i][4]
            device.removableStorage = revertedTable[i][5]
            device.RAM = revertedTable[i][6]
            device.OS = revertedTable[i][7]
            device.customLauncher = revertedTable[i][8]
            device.dimensions = revertedTable[i][9]
            device.weight = revertedTable[i][10]
            device.battery = revertedTable[i][11]
            device.charging = revertedTable[i][12]
            device.display = revertedTable[i][13]
            device.camera = revertedTable[i][14]
            device.video = revertedTable[i][15]
            device.cameraFront = revertedTable[i][16]
            device.fingerPrintScanner = revertedTable[i][17]
            data.push(device)
        }

        await uploadDevices(data)
        
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
    }
}

const uploadDevices = async (devices) => {
    let newDevice;

    for (let i = 0; i < devices.length; i++) {
        try {
            newDevice = new Device(devices[i])
            await newDevice.save()
            console.log(((i + 1/ devices.length) * 100).toFixed(2) + '%')
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    scrapingUrl
}