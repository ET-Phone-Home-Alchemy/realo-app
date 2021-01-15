const pool = require('../utils/pool');

module.exports = class User{

    userId;
    name;
    email;
    phoneNumber;
    carrier;
    password;

    constructor(rows){
      this.userId = rows.user_id;
      this.name = rows.name;
      this.email = rows.email;
      this.phoneNumber = rows.phone_number;
      this.carrier = rows.carrier;
      this.password = rows.password;
    }

    static async insert(name, email, phoneNumber, carrier, passwordHash) {
      const { rows } = await pool.query(`
        INSERT INTO users (name, email, phone_number, carrier, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING users.user_id, users.name, users.email, users.phone_number, users.carrier`, 
      [name, email, phoneNumber, carrier, passwordHash]);

      return new User(rows[0]);
    } 


    toJSON() {
      const json = { ...this };
      delete json.password;
      return json;
    }
};
