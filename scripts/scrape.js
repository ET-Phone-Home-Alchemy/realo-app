const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

request('https://www.zillow.com/portland-or/', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.list-card').each((i, element) => {
      const price = $(element)
        .find('.list-card-price')
        .text()
        .replace(/\D/g, '');

      const bed = $(element)
        .find('.list-card-details li:nth-child(1)')
        .text()
        .replace(/\D/g, '');

      const bath = $(element)
        .find('.list-card-details li:nth-child(2)')
        .text()
        .replace(/\D/g, '');

      const sqft = $(element)
        .find('.list-card-details li:nth-child(3)')
        .text()
        .replace(/\D/g, '');

      const address = $(element)
        .find('.list-card-addr')
        .text();

      const zipcode = address.substring(address.length - 5, address.length);

      const link = $(element)
        .find('a')
        .attr('href');

      const zpid = $(element)
        .attr('id')
        .replace(/\D/g, '');

      // Write Row To CSV
      writeStream.write(`${price}, ${bed}, ${bath}, ${sqft}, ${address}, ${zipcode}, ${link}, ${zpid} \n`);
    });

    console.log('Scraping Done...');
  }
});
