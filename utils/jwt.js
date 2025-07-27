// Minimal JWT utilities: sign and verify tokens.
// Stores the user id in `sub` (subject) claim.

const jwt = require('jsonwebtoken');

function ensureSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is missing. Set it in your .env file.');
  return secret;
}

function signToken(userId, options = {}) {
  const secret = ensureSecret();
  const payload = { sub: userId };
  const jwtOptions = { expiresIn: options.expiresIn || '7d' };
  return jwt.sign(payload, secret, jwtOptions);
}

function verifyToken(token) {
  const secret = ensureSecret();
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
