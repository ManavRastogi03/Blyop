// models/cardModel.js
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  // 🔐 Linked User (one user, many cards allowed)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // 🖼️ Profile Section
  profileImage: {
    type: String,
    default: ''
  },

  // 🙋 Personal Information
  personalInfo: {
    prefix: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true }
  },

  // 🏢 Company / Work Details
  companyDetails: {
    companyName: { type: String, trim: true },
    department: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    bio: { type: String, trim: true },
    companyLogo: { type: String, default: '' },
    logoSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    },
    location: { type: String, trim: true }
  },

  // ☎️ Contact Information
  contactDetails: {
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    website: { type: String, trim: true }
  },

  // 🌐 Social Links
  socialLinks: {
    instagram: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    telegram: { type: String, trim: true },
    youtube: { type: String, trim: true },
    paypal: { type: String, trim: true },
    github: { type: String, trim: true }
  },

  // 🔓 Access Control
  public: {
    type: Boolean,
    default: false
  },

  // 🧪 Trial and Subscription Control
  isTrial: {
    type: Boolean,
    default: true
  },
  trialStart: {
    type: Date,
    default: Date.now
  },
  trialEnds: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  username: {
  type: String,
  unique: true,
  trim: true,
  lowercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // 📅 Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt every time card is saved
cardSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Card', cardSchema);
