const Booking = require('../models/booking');
const Listing = require('../models/listing');
const QRCode = require('qrcode');

// Create a new booking for a listing
module.exports.createBooking = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }

    const { customerName, customerEmail, customerPhone, guestCount, startDate, endDate, paymentMethod } = req.body;

    // Basic validation
    if (!startDate || !endDate || !customerName || !customerEmail) {
      req.flash('error', 'Please provide required booking information');
      return res.redirect(`/listings/${listingId}`);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      req.flash('error', 'Start date must be before end date');
      return res.redirect(`/listings/${listingId}`);
    }

    // Check availability
    const available = await Booking.isAvailable(listingId, start, end);
    if (!available) {
      req.flash('error', 'Selected dates are not available');
      return res.redirect(`/listings/${listingId}`);
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.max(1, Math.ceil((end - start) / msPerDay));
    const totalPrice = nights * (listing.price || 0);

    const booking = new Booking({
      listing: listingId,
      user: req.user ? req.user._id : undefined,
      customerName,
      customerEmail,
      customerPhone,
      guestCount: guestCount ? Number(guestCount) : 1,
      startDate: start,
      endDate: end,
      totalPrice,
      paymentMethod: paymentMethod || 'pay_on_arrival'
    });

    await booking.save();

    // If user chose an online/card payment method, redirect to a payment page with a QR code
    if ((paymentMethod || '').toString() === 'card') {
      // Redirect to nested booking payment page
      return res.redirect(`/listings/${listingId}/bookings/${booking._id}/pay`);
    }

    req.flash('success', `Booking created for ${nights} night(s). Total: ₹${totalPrice.toLocaleString('en-IN')}`);
    res.redirect(`/listings/${listingId}`);
  } catch (err) {
    next(err);
  }
};

// (Optional) show bookings for current user
module.exports.index = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user ? req.user._id : null }).populate('listing');
    res.render('bookings/index.ejs', { bookings });
  } catch (err) {
    next(err);
  }
};

// Render a payment page with a QR code for the booking
module.exports.showPayment = async (req, res, next) => {
  try {
    const { id, bookingId } = req.params; // id = listing id from nested route, bookingId = booking _id
    const booking = await Booking.findById(bookingId).populate('listing');
    if (!booking) {
      req.flash('error', 'Booking not found');
      return res.redirect(`/listings/${id}`);
    }

    // Construct a payment link — replace this with a real payment gateway url in production
    const paymentLink = `${req.protocol}://${req.get('host')}/pay/checkout?booking=${booking._id}`;

    // Generate QR code data URL
    let qrDataUrl;
    try {
      qrDataUrl = await QRCode.toDataURL(paymentLink);
    } catch (err) {
      // If QR code generation fails, fall back to showing the link
      qrDataUrl = null;
    }

    res.render('bookings/pay.ejs', { booking, qrDataUrl, paymentLink });
  } catch (err) {
    next(err);
  }
};
