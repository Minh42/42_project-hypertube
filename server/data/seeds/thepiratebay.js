const fs = require('fs');
const PirateBay = require('thepiratebay')

async function getAllMoviesFromPirateBay() {
    PirateBay.getCategories()
        .then((res) => {
            res[1].subcategories.forEach(element => {
                PirateBay.topTorrents(element.id)
                    .then((res) => {
                        fs.appendFileSync("others.json", JSON.stringify(res), 'utf8');
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
        })
        .catch(err => {
            console.log(err)
        })
}

getAllMoviesFromPirateBay()
