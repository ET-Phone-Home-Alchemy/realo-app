const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const Listing = require('../lib/models/Listing.js');

const searchLinkFront = 'https://www.zillow.com/portland-or/1-_beds/2_p/?searchQueryState=%7B%22pagination%22%3A%7B%22currentPage%22%3A';
const searchLinkBack = '%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-123.77514839172363%2C%22east%22%3A-122.16839790344238%2C%22south%22%3A45.211129097221004%2C%22north%22%3A45.98175482781839%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A13373%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22beds%22%3A%7B%22min%22%3A1%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D';

pool.query(fs.readFileSync('./sql/scrape.sql', 'utf-8'));
let page;
for(page = 1; page <= 20; page++){
  console.log(page);
  const searchLink = searchLinkFront + page + searchLinkBack;

  request(searchLink, (error, response, html) => {
    if(!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const timeStamp = new Date();

      $('.list-card').each((i, element) => {
        const price = $(element)
          .find('.list-card-price')
          .text()
          .replace(/\D/g, '') || null;

        const bed = $(element)
          .find('.list-card-details li:nth-child(1)')
          .text()
          .replace(/\D/g, '') || null;
      
        const bath = $(element)
          .find('.list-card-details li:nth-child(2)')
          .text()
          .replace(/\D/g, '') || null;

        const squareFeet = $(element)
          .find('.list-card-details li:nth-child(3)')
          .text()
          .replace(/\D/g, '') || null;

        const address = $(element)
          .find('.list-card- addr')
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

        Listing.insert(listing);
      });

    }
  }

  );
}

//pool.end();
console.log('Scraping Done...');

