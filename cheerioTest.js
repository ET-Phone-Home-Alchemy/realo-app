const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

request('https://www.zillow.com/portland-or/', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.list-card-info').each((i, element) => {
      const price = $(element)
        .find('.list-card-price')
        .text();

      const bed = $(element)
        .find('.list-card-details li:nth-child(1)')
        .text()
        .match(/^[0-9]/gm);

      const bath = $(element)
        .find('.list-card-details li:nth-child(2)')
        .text()
        .match(/^[0-9]/gm);

      const sqft = $(element)
        .find('.list-card-details li:nth-child(3)')
        .text()
        .match(/[0-9]/g)
        .join('');

      const address = $(element)
        .find('.list-card-addr')
        .text();

      // Write Row To CSV
      writeStream.write(`${price}, ${bed}, ${bath}, ${sqft}, ${address} \n`);
    });

    console.log('Scraping Done...');
  }
});
