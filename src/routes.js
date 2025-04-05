import express from 'express';
import { User } from './models/User.js';
import Cart from './models/Cart.js';

export const userRouter = express.Router();

// POST /signup - Register a new user
userRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password // Note: Password is stored as plain text as per requirements
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// POST /login - User login
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password (plain text comparison as per requirements)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// GET /users - Get all users (for testing purposes)
userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

userRouter.get('/health', async (req, res) => {
  try {
    res.json("All good, server  is running");
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});


export const cartRouter = express.Router();
// Add item to cart
cartRouter.post('/add', async (req, res) => {
  try {
    const { username, item } = req.body;
    
    let cart = await Cart.findOne({ username });
    
    if (!cart) {
      cart = new Cart({
        username,
        items: [item]
      });
    } else {
      cart.items.push(item);
    }
    
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart items by username
cartRouter.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const cart = await Cart.findOne({ username });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart item
cartRouter.put('/item/:username/:itemId', async (req, res) => {
  try {
    const { username, itemId } = req.params;
    const updatedItem = req.body;
    
    const cart = await Cart.findOne({ username });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    cart.items[itemIndex] = { ...cart.items[itemIndex], ...updatedItem };
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete cart item
cartRouter.delete('/item/:username/:itemId', async (req, res) => {
  try {
    const { username, itemId } = req.params;
    
    const cart = await Cart.findOne({ username });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
