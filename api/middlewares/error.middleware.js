const errorObj = (status, message) => ({ status, message });

const errorMiddleware = (err, req, res, next) => {
  const { status, message } = err;
  if (err) {
    return res.status(status || 500).json(message);
  }
  return next();
};

module.exports = {
  errorMiddleware,
  errorObj,
};
