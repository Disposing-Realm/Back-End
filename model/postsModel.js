const { pool } = require("../db.js");

class Post {
  static async totalPost() {
    const database = 'SELECT * FROM posts' 
    const databaseResults = await pool.query(database);
    return databaseResults.rows; 
  } 

  static async singlePost(id) {
    const database = "SELECT * FROM posts where id = $1";
    const disposingdb = "SELECT * FROM comments WHERE user_id = $1";
    const disposingdb2 = await pool.query(disposingdb, [id]);
    const disposingResults = await pool.query(database, [id]);
    return { ...disposingdb2.rows[0], ...disposingResults.rows[0] };
  }
  static async createPostModel(info) {
    const db1 =
      "INSERT INTO posts (post_description, post_image) VALUES ($1, $2) RETURNING *";
    const disposingResults = await pool.query(db1, [
      info.post_description,
      info.post_image,
    ]); 
  }
}

module.exports = Post;
