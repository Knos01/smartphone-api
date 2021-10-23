const request = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/Comparison_of_smartphones';


const scrapingUrl = async (req, res) => {
    try {
        const html = await request(url)
        console.log(html)
        res.status(200).send(html)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    scrapingUrl
}