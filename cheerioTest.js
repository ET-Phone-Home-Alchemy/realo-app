const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

request('https://www.redfin.com/city/30772/OR/Portland/filter/sort=lo-days', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.v2-interactive').each((i, element) => {
      const price = $(element)
        .find('.homecardV2Price')
        .text()
        .replace(/\D/g, '');

      const bed = $(element)
        .find('.HomeStatsV2 li:nth-child(1)')
        .text()
        .replace(/\D/g, '');

      const bath = $(element)
        .find('.HomeStatsV2 li:nth-child(2)')
        .text()
        .replace(/\D/g, '');

      const sqft = $(element)
        .find('.HomeStatsV2 li:nth-child(3)')
        .text()
        .replace(/\D/g, '');

      const address = $(element)
        .find('.link-and-anchor')
        .text();

      // Write Row To CSV
      writeStream.write(`${price}, ${bed}, ${bath}, ${sqft}, ${address} \n`);
    });

    console.log('Scraping Done...');
  }
});
