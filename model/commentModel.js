const { pool } = require("../db.js");

class Comments {
  static async getAllComments(id) {
    const database = "SELECT * FROM comments WHERE post_id = $1";
    const disposingResults = await pool.query(database, [id]);
    return disposingResults.rows;
  }

  static async addComment({post_id, user_id, likes, dislikes, commentary}) {
    const query = "INSERT INTO comments (post_id, user_id, likes, dislikes, commentary) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const disposingResults = await pool.query(query, [post_id, user_id, likes, dislikes, commentary]);  
    
    return { ...disposingResults.rows[0]};
  }

  static async like(likes, id){
    const query = 'UPDATE comments SET likes = $1 WHERE id = $2'
    return await pool.query(query, [likes, id])

  }

  static async dislike(dislikes, id){
    const query = 'UPDATE comments SET dislikes = $1 WHERE id = $2'
    return await pool.query(query, [dislikes, id])

  }


}

module.exports = Comments;
