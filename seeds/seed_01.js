/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function (knex) {
  await knex('users').del()
  await knex('posts').del()
  await knex('comments').del()

  await knex('users').insert([
    { username: 'Evan00', first_name: 'Evan', last_name: 'Lu', email: 'Evan123@gmail.com', password: '123456' }, { username: 'Chris00', first_name: 'Chris', last_name: 'Lopez', email: 'Chris123@gmail.com', password: '12345678' }, { username: 'Richy00', first_name: 'Richard', last_name: 'Castillo', email: 'Rich123@gmail.com', password: '000000' }, { username: 'Delvin123', first_name: 'Delvin', last_name: 'Rey', email: 'Delvin123@gmail.com', password: '1111' }
  ]);

  await knex('posts').insert([
    { post_description: 'Clean 4 Life', post_image: 'https://www.marcylabschool.org/social-media-shared-fb.jpg', post_image2:'https://www.marcylabschool.org/social-media-shared-fb.jpg', user_id: 1 },
  ]);

  await knex('comments').insert([
    { commentary: 'Thanks for caring our environment', post_id: 1, user_id: 1 },
  ]);
};


