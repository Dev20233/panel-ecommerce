const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.get('/my', protect, getMyOrders);
router
  .route('/:id')
  .put(protect, admin, updateOrderStatus)
  .delete(protect, admin, deleteOrder);

module.exports = router;
