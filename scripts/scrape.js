const Throttle = require('superagent-throttle');
const request = require('superagent');
const cheerio = require('cheerio');
// const fs = require('fs');
// const pool = require('../lib/utils/pool.js');
const Listing = require('../lib/models/Listing.js');

const throttle = new Throttle({ rate: 1, ratePer: 5000, concurrent: 1 });

//pool.query(fs.readFileSync('./sql/scrape.sql', 'utf-8'));
let page;
let bed; 
for(page = 1; page <= 10; page++){
  for(bed = 0; bed <= 10; bed++){
    const searchLink = `https://www.zillow.com/portland-or/?searchQueryState=%7B%22pagination%22%3A%7B%22currentPage%22%3A${page}%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-123.11454775976563%2C%22east%22%3A-122.27684024023438%2C%22south%22%3A45.004136336507614%2C%22north%22%3A46.10132794557867%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A13373%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22beds%22%3A%7B%22min%22%3A${bed}%2C%22max%22%3A${bed}%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%7D%2C%22isListVisible%22%3Atrue%7D
  `;

    request(searchLink)
      .set('origin', 'true')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36')
      .use(throttle.plugin())
      .then(response => {
        if(response.statusCode == 200) {
          const html = response.text;
          const $ = cheerio.load(html);
          const timeStamp = new Date();

          $('.list-card').each((i, element) => {
            const price = $(element)
              .find('.list-card-price')
              .text()
              .replace(/\D/g, '') || 0;

            const bed = $(element)
              .find('.list-card-details li:nth-child(1)')
              .text()
              .replace(/\D/g, '') || 0;
      
            const bath = $(element)
              .find('.list-card-details li:nth-child(2)')
              .text()
              .replace(/\D/g, '') || 0;

            const squareFeet = $(element)
              .find('.list-card-details li:nth-child(3)')
              .text()
              .replace(/\D/g, '') || 0;

            const address = $(element)
              .find('.list-card-addr')
              .text();

            const link = $(element)
              .find('a')
              .attr('href');

            const id = $(element)
              .attr('id')
              .replace(/\D/g, '');

            const listing = {
              id,
              source: 'Zillow',
              address,
              link,
              price,
              squareFeet,
              bed,
              bath,
              scrapeTimestamp: timeStamp
            };

            console.log(listing);
            Listing.insert(listing);
          });

        }
      }

      );

  }
}

//pool.end();
console.log('Scraping Done...');


