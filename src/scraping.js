const request = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/Comparison_of_smartphones';


const scrapingUrl = async (req, res) => {
    try {
        const html = await request(url)

        const $ = cheerio.load(html)

        let tbody = $('.wikitable > tbody')
        let rows = tbody.children()
        
        let data = []
        let j = 0


        rows.children().each((index, td) => {
            data[index] = $(td).text().replace('\n', '')
            
        })
        for (index = 0; index < data.length; index++){
            switch(index % 18){
                case 0 : devices.model += '<br>' + data[index]
                            break
                case 1 : devices.SoC += ', ' + data[index]
                            break
                
            }
        }


        console.log(devices.model)
        
        res.status(200).send(devices.model)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    scrapingUrl
}

/*

div {
    color: black;
}

#id {

}

.class {

}

<table>
    <thead>
        <th></th>
    </thead>
    <tbody>
        <tr>
            <td> cock </td>
        </tr>
    </tbody>
</table>


*/

let devices = [
    {
        model: 'Iphone 11',
        SoC: '',
        GPU: '',
        CPU: '',
        StorageCapacity: '',
        RemovableStorage: '',
        RAM: '3',
        OS: '',
        CustomLauncher: '',
        Dimensions: '',
        Weight: '',
        battery: '',
        charging: '',
        display: '',
        camera: '',
        video: '',
        cameraFront: '',
        fingerPrintScanner: ''
    }
]