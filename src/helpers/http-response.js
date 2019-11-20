const httpStatus = {
  badRequest: 400,
  internalServerError: 500,
  success: 200,
  unprocessableEntity: 422,
};

const httpResponse = (status, output) => ({ output, status });

module.exports = {
  badRequest: (output) => httpResponse(httpStatus.badRequest, output),
  internalServerError: (output) => httpResponse(httpStatus.internalServerError, output),
  success: (output) => httpResponse(httpStatus.success, output),
  unprocessableEntity: (output) => httpResponse(httpStatus.unprocessableEntity, output),
};