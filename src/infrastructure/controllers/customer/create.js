const models = require('../../../db/models');
const CustomerEntity = require('../../../domain/entities/customer');
const CustomerCreateService = require('../../../domain/services/customer/create');

module.exports = (req, res) => {
  const service = new CustomerCreateService({ CustomerEntity, customerModel: models.customer });
  const { birthday, country, name, email } = req.body;

  // mudar pro execute ser sincrono e ter os then/catch dentro dele
  return service.execute({ birthday, country, email, name })
    .then(({ output, status }) => res.status(status).json(output))
    .catch(({ output, status }) => res.status(status).json(output));
};

