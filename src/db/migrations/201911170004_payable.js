/* eslint-disable max-lines-per-function, max-statements */

exports.up = knex => Promise.all([
  knex.schema.withSchema('psp').hasTable('payable').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('psp').createTable('payable', (table) => {
        table
          .uuid('payable_uid')
          .comment('Unique code that identifies a payable.');

        table
          .decimal('value', 15, 3)
          .comment('Value of a payable.');

        table
          .uuid('client_uid')
          .comment('Unique code that identifies the client related to a payable.');

        table
          .string('status')
          .comment('Status of a payable.');

        table
          .decimal('fee', 15, 3)
          .comment('Fee of a payable.');

        table
          .timestamp('payment_date')
          .comment('Payment date of a payable.');

        table
          .string('cardholder_name')
          .comment('Name of the cardholder of a payable.');

        table
          .timestamp('card_expiry_date')
          .comment('Card expiry date of a payable.');

        table
          .integer('card_security_code')
          .comment('Card security code of a payable.');

        table
          .timestamp('created_at')
          .comment('Creation date of an payable.');

        table
          .string('created_by', 50)
          .comment('Name of whom created an payable.');

        table
          .timestamp('updated_at')
          .comment('Update date of an payable.');

        table
          .string('updated_by', 50)
          .comment('Name of whom updated an payable.');

        table
          .comment('Table that contains the payables made by clients.');

        table
          .primary(['payable_uid']);

        table
          .foreign('client_uid', 'payable_client_fkey')
          .references('client_uid')
          .inTable('psp.client')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT');
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('psp').dropTableIfExists('payable');
