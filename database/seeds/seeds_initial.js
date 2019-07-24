/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    { email: 'max@example.com', password: 'infiltrate' },
    { email: 'stevie_g@example.com', password: 'infiltrate' },
    { email: 'arne_riise@example.com', password: 'infiltrate' },
  ]);
};
