const { pool } = require("../db.js");

class User {
  static async totalUsers() {
    const database = "SELECT * FROM users";
    const databaseResults = await pool.query(database);
    return databaseResults.rows;
  }

  static async singleUser(id) {
    const database = "SELECT * FROM users where id = $1";
    const disposingdb = "SELECT * FROM posts WHERE user_id = $1";
    const disposingdb2 = await pool.query(disposingdb, [id]);
    const disposingResults = await pool.query(database, [id]);
    return { ...disposingdb2.rows[0], ...disposingResults.rows[0] };
  }

  static async getByEmail(email) {
    const database = "SELECT * FROM users WHERE email = $1";
    const disposingResults = await pool.query(database, [email]);
    return disposingResults.rows[0];
  }

  static async createUser(info) {
    const query =
      "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING*";
    const disposingResults = await pool.query(query, [
      info.first_name,
      info.last_name,
      info.username,
      info.email,
      info.password,
    ]);
    // const { id } = await this.getByEmail(info.email);

    // const disposingResults2 =
    //   "INSERT INTO posts (post_description, post_image, user_id) VALUES ($1, $2, $3) RETURNING*";
    // const dbResults2 = await pool.query(disposingResults2, [
    //   id,
    // ]);
    return disposingResults.rows[0];
  }

  static async updateUser({
    id,
    first_name,
    last_name,
    post_description,
    post_image,
    update_date,
    likes,
    dislikes,
  }) {
    const disposingQuery1 =
      "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING*";
    const disposingQuery2 =
      "UPDATE posts SET post_description = $1, post_image = $2, update_date = $3, likes = $4, dislikes WHERE user_id = $5 RETURNING*";
    await pool
      .query(disposingQuery1, [first_name, last_name, id])
      .then((results) => results.rows[0]);
    return await pool.query(disposingQuery2, [
      post_description,
      post_image,
      update_date,
      likes,
      dislikes,
      id,
    ]);
  }

  static async deleteUser(id) {
    const deletePosts = await pool.query(
      "DELETE FROM posts WHERE user_id = $1",
      [id]
    );
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    return deleteUser.rows[0];
  }
}

module.exports = User;