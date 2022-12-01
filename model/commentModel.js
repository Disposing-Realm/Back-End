const { pool } = require("../db.js");

class Comments {
    static async getAllComments() {
      const database = "SELECT * FROM comments";
      const disposingResults = await pool.query(database);
      return disposingResults.rows;
    }

}

module.exports = Comments;