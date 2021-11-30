const errorHandler = (err, req, res, next) => {
  // the status code should be changed to 500 if it is set to be the default 200
  if (res.statusCode === 200) {
    res.status(500);
  }
  res.json({
    message: err.message,
  });
};

module.exports = errorHandler;
