/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function (knex) {
  await knex('users').del()
  await knex('posts').del()
  await knex('comments').del()

  await knex('users').insert([
    { username: 'marcylab', first_name: 'marcy', last_name: 'lab', email: 'test123@gmail.com', password: '12345678' },
  ]);

  await knex('posts').insert([
    { post_description: 'Clean 4 Life', post_image: 'https://www.marcylabschool.org/social-media-shared-fb.jpg', user_id: 1 },
  ]);

  await knex('comments').insert([
    { commentary: 'Thanks for caring our environment', post_id: 1, user_id: 1 },
  ]);
};


