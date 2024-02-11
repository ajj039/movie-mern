const errorHandler = (err, req, res, next) => {
  const statuscode = err.statusCode ? err.statusCode : 500;
  res.status(statuscode);

  res.json({
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
