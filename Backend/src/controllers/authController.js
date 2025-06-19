import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
 

export const initiateAuth = async (req, res) => {
  try {
    const { mobile, email } = req.body;
    if (!mobile && !email) return res.status(400).json({ message: 'Mobile or Email required' });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); 
const user = await User.findOneAndUpdate(
  { mobile },
  {
    $set: { otp, otpExpires },
    $setOnInsert: {
      mobile,
      email,
      role: 'user',
      isVerified: false
    }
  },
  {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  }
);


    console.log(`OTP sent to ${mobile || email}: ${otp}`); // Simulate sending OTP

    const isNewUser = !user.isVerified;
    return res.status(200).json({
      message: `OTP sent successfully for ${isNewUser ? 'registration' : 'login'}`,
      isNewUser,
      otp:`${otp}`
    });

  } catch (error) {
    console.error('initiateAuth error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const verifyAuth = async (req, res) => {
  try {
    const { mobile, email, otp } = req.body;

    if (!otp || (!mobile && !email)) {
      return res.status(400).json({ message: 'OTP and Mobile or Email are required' });
    }

    const query = mobile ? { mobile } : { email };
    const user = await User.findOne(query);

    if (!user || !user.otp || !user.otpExpires) {
      console.log("REQ BODY:", req.body);
      console.log("FOUND USER:", user);
      return res.status(404).json({ message: 'User or OTP not found' });
    }

    if (user.otp !== otp.toString() || new Date() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const isFirstTime = !user.isVerified;

    // ✅ Clear OTP fields and mark verified
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: `${isFirstTime ? 'Registration' : 'Login'} successful`,
      token,
      user
    });

  } catch (error) {
    console.error('verifyAuth error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
