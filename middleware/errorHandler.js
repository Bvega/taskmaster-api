module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const payload = {
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error',
  };
  if (process.env.NODE_ENV === 'development' && err.stack) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
};
