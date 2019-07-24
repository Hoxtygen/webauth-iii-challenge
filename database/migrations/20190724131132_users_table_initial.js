/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email')
      .notNullable()
      .unique();
    table.text('password')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
