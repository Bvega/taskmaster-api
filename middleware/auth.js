// JWT auth middleware. Reads Authorization: Bearer <token> and attaches req.user = { id }.

const { verifyToken } = require('../utils/jwt');

module.exports = function authenticate(req, res, next) {
  const header = req.headers['authorization'] || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing Bearer token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.sub };
    next();
  } catch (_err) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
};
