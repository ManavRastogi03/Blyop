import Card from '../models/cardModel.js';
import User from '../models/userModel.js';
export const createCard = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // 🔒 (Optional) Check if user is subscribed
    const user = await User.findById(userId);

    const isSubscribed = user?.isSubscribed || false;

    if (!isSubscribed) {
      const existingCard = await Card.findOne({ user: userId });
      if (existingCard) {
        return res.status(400).json({
          message: 'Trial users can only create one card. Please subscribe to add more.'
        });
      }
    }

    // ✅ Create new card
    const newCard = new Card({
      user: userId,
      profileImage: req.body.profileImage || '',

      personalInfo: req.body.personalInfo,
      companyDetails: req.body.companyDetails,
      contactDetails: req.body.contactDetails,
      socialLinks: req.body.socialLinks,

      isTrial: !isSubscribed,
      trialStart: !isSubscribed ? new Date() : undefined,
      trialEnds: !isSubscribed ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined,
      isActive: true,
      public: false
    });

    await newCard.save();

    return res.status(201).json({
      message: 'Card created successfully',
      card: newCard
    });

  } catch (error) {
    console.error('Error creating card:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getMyCard = async (req, res) => {
  try {
    const userId = req.userId;

    // 🔍 Find the latest card of the user (if multiple allowed later)
    const card = await Card.findOne({ user: userId });

    if (!card) {
      return res.status(404).json({ message: 'No card found for this user' });
    }

    //  Trial expiry check: auto-block if trial expired
    if (card.isTrial && card.trialEnds && card.trialEnds < new Date()) {
      if (card.isActive) {
        card.isActive = false;
        await card.save();
      }
    }

    return res.status(200).json({
      message: 'Card fetched successfully',
      card
    });

  } catch (error) {
    console.error('Error fetching card:', error);
    return res.status(500).json({ message: 'Something went wrong while fetching the card' });
  }
};
export const updateCard = async (req, res) => {
  try {
    const userId = req.userId;
    const cardId = req.params.id;

    //  Find the card by ID and user ownership
    const card = await Card.findOne({ _id: cardId, user: userId });
    if (!card) {
      return res.status(404).json({ message: 'Card not found or unauthorized access' });
    }

    // If trial expired, block update unless user is subscribed
    if (card.isTrial && card.trialEnds < Date.now()) {
      return res.status(403).json({
        message: 'Trial expired. Please subscribe to update this card.'
      });
    }

    // Update fields (grouped)
    if (req.body.personalInfo) card.personalInfo = req.body.personalInfo;
    if (req.body.companyDetails) card.companyDetails = req.body.companyDetails;
    if (req.body.contactDetails) card.contactDetails = req.body.contactDetails;
    if (req.body.socialLinks) card.socialLinks = req.body.socialLinks;
    if (req.body.profileImage !== undefined) card.profileImage = req.body.profileImage;
    if (req.body.public !== undefined) card.public = req.body.public;

    card.updatedAt = new Date();
    await card.save();

    return res.status(200).json({
      message: 'Card updated successfully',
      card
    });

  } catch (error) {
    console.error('Error updating card:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const deleteCard = async (req, res) => {
  try {
    const userId = req.userId;
    const cardId = req.params.id;

    //  Only delete if user owns the card
    const card = await Card.findOne({ _id: cardId, user: userId });
    if (!card) {
      return res.status(404).json({ message: 'Card not found or access denied' });
    }

    await Card.deleteOne({ _id: cardId });

    return res.status(200).json({
      message: 'Card deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting card:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getPublicCard = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const card = await Card.findOne({ username, public: true, isActive: true })
      .select('-__v -user -updatedAt -createdAt -isTrial -trialStart -trialEnds');

    if (!card) {
      return res.status(404).json({ message: 'Public card not found or inactive' });
    }

    return res.status(200).json({
      success: true,
      message: 'Public card fetched successfully',
      card
    });

  } catch (error) {
    console.error('❌ Error in getPublicCard:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const createPublicCard = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      username,
      profileImage,
      personalInfo,
      companyDetails,
      contactDetails,
      socialLinks,
      public: isPublic = true
    } = req.body;

    // ✅ Optional username: Check only if provided
    if (username) {
      const cleanedUsername = username.toLowerCase().trim();
      const usernameExists = await Card.findOne({ username: cleanedUsername });

      if (usernameExists) {
        return res.status(409).json({ message: 'Username already taken' });
      }
    }

    // ✅ Allow only one card per user (unless subscription system allows multiple later)
    const existingCard = await Card.findOne({ user: userId });
    if (existingCard) {
      return res.status(400).json({ message: 'User already has a card' });
    }

    // 🧠 Trial system (7 days)
    const trialStart = new Date();
    const trialEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // ✅ Card Creation
    const newCard = new Card({
      user: userId,
      username: username ? username.toLowerCase().trim() : undefined,
      profileImage,
      personalInfo,
      companyDetails,
      contactDetails,
      socialLinks,
      public: isPublic,
      isTrial: true,
      trialStart,
      trialEnds,
      isActive: true
    });

    await newCard.save();

    return res.status(201).json({
      message: 'Public card created successfully with 7-day trial',
      card: newCard
    });

  } catch (error) {
    console.error('❌ Error creating public card:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const claimUsername = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.body;

    // ✅ Validation
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Username is required and must be a string' });
    }

    const cleanedUsername = username.toLowerCase().trim();

    // ✅ Check if username is already taken
    const existingUsername = await Card.findOne({ username: cleanedUsername });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // ✅ Find user's card
    const card = await Card.findOne({ user: userId });
    if (!card) {
      return res.status(404).json({ message: 'Card not found for this user' });
    }

    // ✅ If already has a username
    if (card.username) {
      return res.status(400).json({ message: 'Username already claimed for this card' });
    }

    // ✅ Update card with username and make it public
    card.username = cleanedUsername;
    card.public = true;
    await card.save();

    return res.status(200).json({
      success: true,
      message: 'Username claimed successfully',
      cardUrl: `https://bloyd.com/${cleanedUsername}`,
      card
    });

  } catch (error) {
    console.error('❌ Error in claimUsername:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const checkUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ available: false, message: 'Username is required' });
    }

    const cleanedUsername = username.toLowerCase().trim();

    const existing = await Card.findOne({ username: cleanedUsername });

    if (existing) {
      return res.status(200).json({
        available: false,
        message: 'Username is already taken'
      });
    }

    return res.status(200).json({
      available: true,
      message: 'Username is available'
    });

  } catch (error) {
    console.error('❌ Error in checkUsernameAvailability:', error);
    return res.status(500).json({ available: false, message: 'Server error' });
  }
};


