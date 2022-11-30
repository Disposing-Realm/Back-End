/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('comment_id').primary();
        table.string('commentary').notNullable;
        table.timestamp("comment_date").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_date").notNullable().defaultTo(knex.fn.now());
        table.integer('likes').notNullable().defaultTo(0)
        table.integer('dislikes').notNullable().defaultTo(0)
        table.integer('post_id').notNullable;
        table.foreign('post_id').references('post_id').inTable('posts');
        table.integer('user_id').notNullable;
        table.foreign('user_id').references('user_id').inTable('users');
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
