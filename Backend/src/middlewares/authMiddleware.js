import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to protect private routes.
 * Attaches user ID and user object to the request.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token missing or invalid' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Fetch full user and attach to req
    const user = await User.findById(decoded.userId).select('-otp -otpExpires');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (err) {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    console.error('authMiddleware error:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};