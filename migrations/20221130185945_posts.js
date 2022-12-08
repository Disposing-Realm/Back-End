/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('post_id').primary();
        table.string('post_description').notNullable;
        table.string('post_image').notNullable;
        table.string('post_image2').notNullable;
        table.timestamp("post_date").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_date").notNullable().defaultTo(knex.fn.now());
        table.integer('likes').notNullable().defaultTo(0)
        table.integer('dislikes').notNullable().defaultTo(0)
        table.integer('user_id').notNullable;
        table.foreign('user_id').references('user_id').inTable('users');
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};