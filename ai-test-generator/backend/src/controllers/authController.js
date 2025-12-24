const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../utils/validators');

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, secret, { expiresIn });
};

exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password, role } = req.body;
    // Normalize email to lowercase for consistent storage and lookup
    const normalizedEmail = email.toLowerCase().trim();
    
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      console.log(`Registration failed: Email already exists: ${normalizedEmail}`);
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Ensure role is valid or default to 'student'
    const validRole = role && ['student', 'teacher', 'admin'].includes(role) ? role : 'student';

    const user = await User.create({ 
      name: name || 'User', 
      email: normalizedEmail, 
      password, 
      role: validRole
    });

    console.log(`User registered successfully: ${user.email} (${user.role})`);

    // Auto-login after registration - create token and return it
    const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

    res.status(201).json({ 
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        role: user.role
      }, 
      message: 'Registration successful! You have been automatically logged in.'
    });
  } catch (err) {
    console.error('Registration error:', err);
    // Handle duplicate key error (MongoDB unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  // Normalize email to lowercase for consistent lookup
  const normalizedEmail = email.toLowerCase().trim();
  
  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`Login attempt failed: User not found for email: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Login attempt failed: Password mismatch for email: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    console.log(`Login successful for user: ${user.email} (${user.role})`);
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        role: user.role
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};
