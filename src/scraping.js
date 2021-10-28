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

        rows.children().each((index, td) => {
            data[index] = $(td).text().replace('\n', '')
        })


        console.log(data)
        
        res.status(200).send(data)
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
        producer: 'Apple',
        model: 'Iphone 11',
        ram: '3'
    }
]