const catchErrors = requestHandler => {
  return function(req, res, next) {
    return requestHandler(req, res, next).catch(next);
  };
};

const notFoundErrors = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

const messageValidationErrors = (err, req, res, next) => {
  console.dir(err);
  if(!err.errors && !err.code) return next(err);

  const errorList = Object.keys(err.errors);
  //err.errors[key].message
  res
    .status(400)
    .send({
      errors: errorList.map(key => {
        const { message, kind, path, value } = err.errors[key];
        return { message, kind, path, value };
      })
    });
};

module.exports = {
  catchErrors, messageValidationErrors, notFoundErrors
};
