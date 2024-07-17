import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

// Function to create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to log in a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token  ------ Token Generation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set cookie in the response
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      maxAge: 3600000, // Expires in 1 hour
      secure: process.env.NODE_ENV === 'production' // HTTPS only in production
    });

    res.json({ message: 'Login successful', token , username:user.username , user_id:user._id});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};











