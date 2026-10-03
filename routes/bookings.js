const express = require('express');
const router = express.Router({ mergeParams: true });
const bookingController = require('../controllers/bookings');
const { isLoggedIn } = require('../middleware');

// Create booking for a listing
router.post('/', isLoggedIn, bookingController.createBooking);

// Optionally, list current user's bookings
router.get('/', isLoggedIn, bookingController.index);

// Payment page for a booking (generate QR)
router.get('/:bookingId/pay', isLoggedIn, bookingController.showPayment);

module.exports = router;
