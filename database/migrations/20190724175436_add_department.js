/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('department');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTableIfExists('users', (table) => {
    table.string('department').nullable();
  });
};
