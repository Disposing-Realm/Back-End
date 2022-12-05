const { pool } = require("../db.js");

class Post {
  static async totalPost() {
    const database = 'SELECT * FROM posts' 
    const databaseResults = await pool.query(database);
    return databaseResults.rows; 
  } 

  static async singlePost(id) {
    const database = "SELECT * FROM posts where id = $1";
    const disposingdb = "SELECT * FROM comments WHERE post_id = $1";
    const disposingdb2 = await pool.query(disposingdb, [id]);
    const disposingResults = await pool.query(database, [id]);
    return { ...disposingdb2.rows[0], ...disposingResults.rows[0] };
  }
  static async createPostModel(info) {
    const query =
      "INSERT INTO posts (user_id, post_description, post_image) VALUES ($1, $2, $3) RETURNING *";
    const disposingResults = await pool.query(query, [
      info.user_id,
      info.post_description,
      info.post_image
    ]); 
  }

  static async like(likes, id){
    const query = 'UPDATE pots SET likes = $1 WHERE id = $2'
    return await pool.query(query, [likes, id])

  }

  static async dislike(dislikes, id){
    const query = 'UPDATE posts SET dislikes = $1 WHERE id = $2'
    return await pool.query(query, [dislikes, id])

  }
}

module.exports = Post;
