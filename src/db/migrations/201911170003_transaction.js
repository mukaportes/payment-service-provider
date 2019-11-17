/* eslint-disable max-lines-per-function, max-statements  */

exports.up = knex => Promise.all([
  knex.schema.withSchema('psp').hasTable('transaction').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('psp').createTable('transaction', (table) => {
        table
          .uuid('transaction_uid')
          .comment('Unique code that identifies a transaction.');

        table
          .uuid('customer_uid')
          .comment('Unique code that identifies the customer related to a transaction.');

        table
          .decimal('amount', 15, 3)
          .comment('Amount of a transaction.');

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
          .string('card_holder_name')
          .comment('Name of the cardholder of a transaction.');

        table
          .timestamp('card_expiration_date')
          .comment('Card expiration date of a transaction.');

        table
          .integer('card_cvv')
          .comment('Card CVV of a transaction.');

        table
          .timestamp('created_at')
          .comment('Creation date of an transaction.');

        table
          .string('created_by', 50)
          .comment('Name of whom created an transaction.');

        table
          .comment('Table that contains the transactions made by customers.');

        table
          .primary(['transaction_uid']);

        table
          .foreign('customer_uid', 'transaction_customer_fkey')
          .references('customer_uid')
          .inTable('psp.customer')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT');
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('psp').dropTableIfExists('transaction');
