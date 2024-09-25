const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ApiError } = require('../../utils/apiError');
const path = require('path');


exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;


    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let profilePicture = null;
    if (req.file) {
      profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const userId = await User.createUser({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword, 
      profilePicture 
    });
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created', token, profilePicture });
  } catch (err) {
    console.error("Error during registration:", err);
    next(new ApiError(500, 'Registration failed'));
  }
};


exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'User not exist' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
  
      const token = jwt.sign({ id: user.id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Login failed' });
    }
  };