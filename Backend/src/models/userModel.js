import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
mobile: { type: String, required: true, unique: true },
email: { type: String, unique: true, sparse: true },


  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // 🧑 Profile Info
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  avatar: { type: String, default: '' },

  // 💰 Subscription Info
  isSubscribed: { type: Boolean, default: false },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'pro', 'business'],
    default: 'free'
  },
  subscriptionExpires: Date,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);