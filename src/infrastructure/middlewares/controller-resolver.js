const controllerResolver = (req, res) => {
  const controller = this.controllerFactory.build();

  controller.execute(req)
    .then(({ status, data }) => res.status(status).json(data))
    .catch((error) => res.status(500)
      .json({ details: error.stack, error: error.message }));
};

module.exports = controllerResolver;
