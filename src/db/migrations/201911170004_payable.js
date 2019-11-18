/* eslint-disable max-lines-per-function, max-statements */

exports.up = knex => Promise.all([
  knex.schema.withSchema('psp').hasTable('payable').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('psp').createTable('payable', (table) => {
        table
          .uuid('payable_uid')
          .notNullable()
          .comment('Unique code that identifies a payable.');

        table
          .uuid('transaction_uid')
          .notNullable()
          .comment('Unique code that identifies the transaction related to a payable.');

        table
          .integer('status')
          .notNullable()
          .comment('Status of a payable.');

        table
          .decimal('fee', 15, 3)
          .notNullable()
          .comment('Fee of a payable.');
        
        table
          .decimal('amount', 15, 3)
          .notNullable()
          .comment('Amount of a payable.');

        table
          .timestamp('payment_date')
          .notNullable()
          .comment('Payment date of a payable.');

        table
          .timestamp('created_at')
          .notNullable()
          .comment('Creation date of an payable.');

        table
          .string('created_by', 50)
          .notNullable()
          .comment('Name of whom created an payable.');

        table
          .comment('Table that contains the payables related to transactions.');

        table
          .primary(['payable_uid']);

        table
          .foreign('transaction_uid', 'payable_transaction_fkey')
          .references('transaction_uid')
          .inTable('psp.transaction')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT');
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('psp').dropTableIfExists('payable');
