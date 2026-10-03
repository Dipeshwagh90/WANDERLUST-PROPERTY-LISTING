const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: String,
  guestCount: {
    type: Number,
    default: 1,
    min: 1
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['pay_on_arrival', 'card'],
    default: 'pay_on_arrival'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index to help availability queries
bookingSchema.index({ listing: 1, startDate: 1, endDate: 1 });

/**
 * Static helper to check availability for a listing between two dates.
 * Returns true if there is NO overlapping booking, false otherwise.
 * Overlap logic: two ranges [a,b] and [c,d] overlap if a <= d && c <= b
 */
bookingSchema.statics.isAvailable = async function (listingId, startDate, endDate) {
  if (!listingId || !startDate || !endDate) return false;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) return false;

  const overlapping = await this.findOne({
    listing: listingId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } }
    ]
  }).lean();

  return !overlapping;
};

module.exports = mongoose.model('Booking', bookingSchema);
