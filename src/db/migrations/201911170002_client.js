/* eslint-disable max-lines-per-function, max-statements */
exports.up = knex => Promise.all([
  knex.schema.withSchema('order').hasTable('client').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('order').createTable('client', (table) => {
        table
          .uuid('client_uid')
          .comment('Unique code that identifies a client.');

        table
          .string('first_name')
          .comment('First name of a client.');
        
        table
          .string('last_name')
          .comment('Last name of a client.');

        table
          .timestamp('birth_date')
          .comment('Birth date of a client.');

        table
          .string('email')
          .comment('Email of a client.');

        table
          .timestamp('created_at')
          .comment('Creation date of an client.');

        table
          .string('created_by', 50)
          .comment('Name of whom created an client.');

        table
          .timestamp('updated_at')
          .comment('Update date of an client.');

        table
          .string('updated_by', 50)
          .comment('Name of whom updated an client.');

        table
          .comment('Table that contains the clients.');

        table
          .primary(['client_uid']);
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('order').dropTableIfExists('client');
