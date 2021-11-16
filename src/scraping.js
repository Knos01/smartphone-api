const request = require('request-promise');
const cheerio = require('cheerio');
const tableParser = require('cheerio-tableparser');
const url = 'https://en.wikipedia.org/wiki/Comparison_of_smartphones';


const scrapingUrl = async (req, res) => {
    try {
        const html = await request(url)

        const $ = cheerio.load(html)

        tableParser($);
        let tbody = $('.wikitable > tbody')
        let parsedTableData = tbody.parsetable(true, true, true);
        let revertedTable = parsedTableData[0].map((_, colIndex) => parsedTableData.map(row => row[colIndex]));
        
        let data = []

        //put each element of revertedTable inside devices 
        for (let i = 1; i < revertedTable.length; i++) {
            let device = {}
            device.model = revertedTable[i][0]
            device.SoC = revertedTable[i][1]
            device.GPU = revertedTable[i][2]
            device.CPU = revertedTable[i][3]
            device.StorageCapacity = revertedTable[i][4]
            device.RemovableStorage = revertedTable[i][5]
            device.RAM = revertedTable[i][6]
            device.OS = revertedTable[i][7]
            device.CustomLauncher = revertedTable[i][8]
            device.Dimensions = revertedTable[i][9]
            device.Weight = revertedTable[i][10]
            device.battery = revertedTable[i][11]
            device.charging = revertedTable[i][12]
            device.display = revertedTable[i][13]
            device.camera = revertedTable[i][14]
            device.video = revertedTable[i][15]
            device.cameraFront = revertedTable[i][16]
            device.fingerPrintScanner = revertedTable[i][17]
            data.push(device)
        }
        
        console.log(data[0])
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    scrapingUrl
}