const pool = require('../utils/pool');

module.exports = class Listing {
  filterId;
  userId;
  filterName;
  squareFeetMin;
  squareFeetMax;
  bedMin;
  bedMax;
  bathMin;
  bathMax;
  priceMin;
  priceMax;

  constructor(row) {
    this.filterId = row.filter_id;
    this.userId = row.user_id;
    this.filterName = row.filter_name;
    this.squareFeetMin = row.square_feet_min;
    this.squareFeetMax = row.square_feet_max;
    this.bedMin = row.bed_min;
    this.bedMax = row.bed_max;
    this.bathMin = row.bath_min;
    this.bathMax = row.bath_max;
    this.priceMin = row.price_min;
    this.priceMax = row.price_max;
  }

  static async insert({ filterName, squareFeetMin, squareFeetMax, bedMin, bedMax, bathMin, bathMax, priceMin, priceMax }, userId) {

    const { rows } = await pool.query(
      `INSERT into listings (filter_name, square_feet_min, square_feet_max, bed_min, bed_max, bath_min, bath_max, price_min, price_max, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [filterName, squareFeetMin, squareFeetMax, bedMin, bedMax, bathMin, bathMax, priceMin, priceMax, userId]
    );

    return new Listing(rows[0]);
  }

};
