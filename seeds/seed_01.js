/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()


  await knex('users').insert([
    { first_name: 'marcy', last_name: 'lab', email: 'test123@gmail.com', password: '12345678' },
  ]);
}