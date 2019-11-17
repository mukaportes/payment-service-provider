/* eslint-disable max-lines-per-function, max-statements  */

exports.up = knex => Promise.all([
  knex.schema.withSchema('order').hasTable('transaction').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('order').createTable('transaction', (table) => {
        table
          .uuid('transaction_uid')
          .comment('Unique code that identifies a transaction.');

        table
          .decimal('value', 15, 3)
          .comment('Value of a transaction.');

        table
          .uuid('client_uid')
          .comment('Unique code that identifies the client related to a transaction.');

        table
          .string('description')
          .comment('Description of a transaction.');

        table
          .integer('payment_method')
          .comment('Payment method of a transaction.');

        table
          .integer('card_number')
          .comment('Last digits of the card number of a transaction.');

        table
          .string('cardholder_name')
          .comment('Name of the cardholder of a transaction.');

        table
          .timestamp('card_expiry_date')
          .comment('Card expiry date of a transaction.');

        table
          .integer('card_security_code')
          .comment('Card security code of a transaction.');

        table
          .timestamp('created_at')
          .comment('Creation date of an transaction.');

        table
          .string('created_by', 50)
          .comment('Name of whom created an transaction.');

        table
          .timestamp('updated_at')
          .comment('Update date of an transaction.');

        table
          .string('updated_by', 50)
          .comment('Name of whom updated an transaction.');

        table
          .comment('Table that contains the transactions made by clients.');

        table
          .primary(['transaction_uid']);

        table
          .foreign('client_uid', 'transaction_client_fkey')
          .references('client_uid')
          .inTable('psp.client')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT');
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('order').dropTableIfExists('transaction');
