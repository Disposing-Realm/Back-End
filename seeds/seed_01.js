/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function (knex) {
  await knex('users').del()
  await knex('posts').del()
  await knex('comments').del()

  await knex('users').insert([
    { username: 'Delvin123', first_name: 'Delvin', last_name: 'Rey', email: 'Delvin123@gmail.com', password: '1111' }, { username: 'Evan00', first_name: 'Evan', last_name: 'Lu', email: 'Evan123@gmail.com', password: '123456' }, { username: 'Chris00', first_name: 'Chris', last_name: 'Lopez', email: 'Chris123@gmail.com', password: '12345678' }, { username: 'Richy00', first_name: 'Richard', last_name: 'Castillo', email: 'Rich123@gmail.com', password: '000000' }
  ]);

  await knex('posts').insert([
    { post_description: 'A step to a beautiful community', post_image: 'https://cms.prod.nypr.digital/images/334663/fill-1200x800%7Cformat-jpeg%7Cjpegquality-85', post_image2:'https://brooklyneagle.com/wp-content/uploads/2016/02/brooklyn-litter-essay-contest.jpg', user_id: 1 }, { post_description: 'Huh? what trash?', post_image: 'https://www.archpaper.com/wp-content/uploads/2020/09/7235072128_58434052b3_k-1280x853.jpg', post_image2:'https://media.abc10.com/assets/WTHR/images/fc27b4ff-5e68-4266-91d0-2fa52ee9d352/fc27b4ff-5e68-4266-91d0-2fa52ee9d352_750x422.jpeg', user_id: 3 }
  ]);

  await knex('comments').insert([
    { commentary: 'Thanks for caring for our environment', post_id: 1, user_id: 4 },
  ]);
};


