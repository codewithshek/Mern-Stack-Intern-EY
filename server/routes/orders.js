import express from 'express';
import Order from '../models/Order.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all orders for current user
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name address phone')
      .populate('items.menuItem', 'name imageUrl');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the current user or if user is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new order
router.post('/', authenticate, async (req, res) => {
  try {
    const { 
      restaurant, 
      items, 
      totalAmount, 
      deliveryAddress, 
      paymentMethod,
      deliveryInstructions 
    } = req.body;
    
    const order = new Order({
      user: req.user._id,
      restaurant,
      items,
      totalAmount,
      deliveryAddress: deliveryAddress || req.user.address,
      paymentMethod,
      deliveryInstructions
    });
    
    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel order (user can cancel their own pending orders)
router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the current user
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }
    
    // Check if order is in a status that can be cancelled
    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;