import express from 'express';
import Restaurant from '../models/Restaurant.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new restaurant (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      cuisine, 
      address, 
      phone, 
      email, 
      imageUrl, 
      openingHours 
    } = req.body;
    
    const restaurant = new Restaurant({
      name,
      description,
      cuisine,
      address,
      phone,
      email,
      imageUrl,
      openingHours
    });
    
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update restaurant (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete restaurant (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;