const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const pool = require('../lib/utils/pool.js');
const Listing = require('../lib/models/Listing.js');

const searchLink = 'https://www.zillow.com/portland-or/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-122.99163821386719%2C%22east%22%3A-122.39974978613282%2C%22south%22%3A45.291795483879184%2C%22north%22%3A45.81779332035267%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A13373%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%7D';

pool.query(fs.readFileSync('./sql/scrape.sql', 'utf-8'));

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
        .find('.list-card-addr')
        .text();

      const zipCode = address.substring(address.length - 5, address.length);

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
        zipCode,
        link,
        price,
        squareFeet,
        bed,
        bath,
        scrapeTimestamp: timeStamp
      };

      Listing.insert(listing);
});
    console.log('Scraping Done...');
  }
});
