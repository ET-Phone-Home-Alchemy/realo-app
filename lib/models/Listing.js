const pool = require('../utils/pool');

module.exports = class Listing {
  id;
  source;
  address;
  zipCode;
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
    this.zipCode = row.zip_code;
    this.link = row.link;
    this.price = row.price;
    this.squareFeet = row.square_feet;
    this.bed = row.bed;
    this.bath = row.bath;
    this.scrapeTimestamp = row.scrape_timestamp;
  }

  static async insert(listing) {
    //console.log(listing);
    const { rows } = await pool.query(
      `INSERT into listings (id, source, address, zip_code, link, price, square_feet, bed, bath, scrape_timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [listing.id, listing.source, listing.address, listing.zipCode, listing.link, listing.price, listing.squareFeet, listing.bed, listing.bath, listing.scrapeTimestamp]
    );
    return new Listing(rows[0]);
  }

};
