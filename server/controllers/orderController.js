const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentStatus, paymentId, paidAt } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Authoritative price calculation
    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res.status(404).json({ message: `One or more products in your cart are no longer available. Please update your cart.` });
      }
      const itemTotal = dbProduct.price * item.quantity;
      calculatedSubtotal += itemTotal;
      validatedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        image: dbProduct.image,
        price: dbProduct.price,
        quantity: item.quantity,
        size: item.size || '',
      });
    }

    const shippingCost = calculatedSubtotal >= 2000 ? 0 : 199;
    const authoritativeTotal = calculatedSubtotal + shippingCost;

    const order = await Order.create({
      user: req.user._id,
      items: validatedItems,
      shippingAddress,
      totalPrice: authoritativeTotal,
      paymentMethod,
      paymentStatus: paymentStatus || 'Pending',
      paymentId,
      paidAt,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`  Validation error on '${key}':`, error.errors[key].message);
      });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items.product', 'name image price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order removed' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
