// Handles routes that were not matched earlier.

module.exports = (req, res, _next) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  });
};
