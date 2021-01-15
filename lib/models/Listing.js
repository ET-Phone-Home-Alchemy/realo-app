const pool = require('../utils/pool');

module.exports = class Listing {
  id;
  source;
  address;
  link;
  price;
  squareFeet;
  bed;
  bath;
  scrapeTimestamp;

  constructor(row) {
    this.id = row.id;
    this.source = row.source;
    this.address = row.address;
    this.link = row.link;
    this.price = row.price;
    this.squareFeet = row.square_feet;
    this.bed = row.bed;
    this.bath = row.bath;
    this.scrapeTimestamp = row.scrape_timestamp;
  }

  static async insert({ id, source, address, link, price, squareFeet, bed, bath, scrapeTimestamp }) {
    console.log(id, source, address, link, price, squareFeet, bed, bath, scrapeTimestamp);
    const { rows } = await pool.query(
      `INSERT into listings (id, source, address, link, price, square_feet, bed, bath, scrape_timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO NOTHING
       RETURNING *`,
      [id, source, address, link, price, squareFeet, bed, bath, scrapeTimestamp]
    );

    if(!rows[0]){
      return null;
    }
    return new Listing(rows[0]);
  }

};
