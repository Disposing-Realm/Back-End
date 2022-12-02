const { pool } = require("../db.js");

class Comments {
  static async getAllComments() {
    const database = "SELECT * FROM comments";
    const disposingResults = await pool.query(database);
    return disposingResults.rows;
  }

  static async singleComment(id) {
    const database = "SELECT * FROM comments where id = $1";
    const disposingdb = "SELECT * FROM posts WHERE comment_id = $1";
    const disposingdb2 = await pool.query(disposingdb, [id]);
    const disposingResults = await pool.query(database, [id]);
    return { ...disposingdb2.rows[0], ...disposingResults.rows[0] };
  }
}

module.exports = Comments;
