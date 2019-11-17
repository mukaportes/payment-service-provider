exports.up = knex => knex.schema.createSchema('psp');
exports.down = knex => knex.schema.dropSchema('psp');
