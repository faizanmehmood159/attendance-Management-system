const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ApiError } = require('../../utils/apiError');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await User.createUser({ firstName, lastName, email, password: hashedPassword });
    
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created', token });
  } catch (err) {
    next(new ApiError(500, 'Registration failed'));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ApiError(401, 'Invalid credentials'));
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    next(new ApiError(500, 'Login failed'));
  }
};
