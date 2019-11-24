const models = require('../../../db/models');
const CustomerEntity = require('../../../domain/entities/customers');
const CustomerCreateService = require('../../../domain/services/customers/create');

module.exports = (req, res) => {
  const service = new CustomerCreateService(CustomerEntity, models.customer);
  const { birthday, country, name } = req.body;

  // mudar pro execute ser sincrono e ter os then/catch dentro dele
  return service.execute({ birthday, country, name })
    .then(({ output, status }) => res.status(status).json(output));
};

