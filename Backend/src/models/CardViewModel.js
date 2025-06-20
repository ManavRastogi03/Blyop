import mongoose from 'mongoose';

const CardViewSchema = new mongoose.Schema(
  {
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    browser: String,
    os: String,
    deviceType: String,

    geo: {
      country: String,
      region: String,
      city: String,
    },

    isUnique: {
      type: Boolean,
      default: false,
    },

    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

CardViewSchema.index({ card: 1, ipAddress: 1, userAgent: 1, viewedAt: 1 });

export default mongoose.model('CardView', CardViewSchema);
