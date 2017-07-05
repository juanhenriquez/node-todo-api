const catchErrors = requestHandler => {
  return function(req, res, next) {
    return requestHandler(req, res, next).catch(next);
  };
};

const messageValidationErrors = (err, req, res, next) => {
  if(!err.errors) return next(err);
  const errorList = Object.keys(err.errors);

  res
    .status(400)
    .send({ errors: errorList.map(key => err.errors[key].message) });
};

module.exports = {
  catchErrors, messageValidationErrors
};