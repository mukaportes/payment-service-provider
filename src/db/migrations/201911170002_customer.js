/* eslint-disable max-lines-per-function, max-statements */
exports.up = knex => Promise.all([
  knex.schema.withSchema('psp').hasTable('customer').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('psp').createTable('customer', (table) => {
        table
          .uuid('customer_uid')
          .comment('Unique code that identifies a customer.');

        table
          .string('name')
          .comment('Name of a customer.');
        
        table
          .string('country')
          .comment('Country of a customer.');

        table
          .timestamp('birthday')
          .comment('Birthday of a customer.');

        table
          .string('email')
          .comment('Email of a customer.');

        table
          .timestamp('created_at')
          .comment('Creation date of an customer.');

        table
          .string('created_by', 50)
          .comment('Name of whom created an customer.');

        table
          .timestamp('updated_at')
          .comment('Update date of an customer.');

        table
          .string('updated_by', 50)
          .comment('Name of whom updated an customer.');

        table
          .comment('Table that contains the customers.');

        table
          .primary(['customer_uid']);
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('psp').dropTableIfExists('customer');
