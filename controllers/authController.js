// Auth controllers: register and login.
// Keep them thin; validation minimal for the student MVP.

const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { signToken } = require('../utils/jwt');

// POST /api/users/register
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'BadRequest', message: 'username, email, and password are required' });
  }

  // Friendly unique email check
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'Conflict', message: 'Email already in use' });
  }

  const user = await User.create({ username, email, password });
  const token = signToken(user._id.toString());
  res.status(201).json({ user, token });
});

// POST /api/users/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'BadRequest', message: 'email and password are required' });
  }

  // Select password explicitly because we set select:false on schema
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
  }

  const token = signToken(user._id.toString());
  const safeUser = user.toObject();
  delete safeUser.password;
  res.json({ user: safeUser, token });
});
