import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all menu items for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      restaurant: req.params.restaurantId,
      isAvailable: true
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new menu item (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      category, 
      imageUrl, 
      restaurant,
      isVegetarian,
      spiceLevel
    } = req.body;
    
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      restaurant,
      isVegetarian,
      spiceLevel
    });
    
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update menu item (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete menu item (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;