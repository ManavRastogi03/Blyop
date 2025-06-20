import Card from '../models/cardModel.js';
import CardView from '../models/CardViewModel.js';
import geoip from 'geoip-lite';
import useragent from 'useragent';

export const logCardView = async (req, res, next) => {
  try {
    const { username } = req.params;

    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) return next(); // Skip logging if card doesn't exist or is inactive

    // Extract IP address
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = rawIp?.split(',')[0].replace(/^.*:/, '') || '0.0.0.0';

    // Extract User-Agent details
    const userAgentStr = req.headers['user-agent'] || 'Unknown';
    const agent = useragent.parse(userAgentStr);

    // Get geolocation
    const location = geoip.lookup(ip);

    // Check for unique view (by IP per day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingView = await CardView.findOne({
      card: card._id,
      ipAddress: ip,
      viewedAt: { $gte: today }
    });

    // Save the view
    const newView = new CardView({
      card: card._id,
      ipAddress: ip,
      userAgent: userAgentStr,
      browser: agent.family,
      os: agent.os.toString(),
      deviceType: agent.device.toString(),
      geo: location
        ? {
            country: location.country,
            region: location.region,
            city: location.city,
          }
        : {},
      isUnique: !existingView,
      viewedAt: new Date()
    });

    await newView.save();
    next(); // Continue middleware flow (e.g., return card)

  } catch (err) {
    console.error('❌ logCardView error:', err);
    next(); // Continue even if analytics fails
  }
};
export const getTotalViews = async (req, res) => {
  try {
    const { username } = req.params;

    // 🛡 Validate input
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // 🔍 Find the card by username
    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found or inactive' });
    }

    // 🔢 Count total views from CardView collection
    const totalViews = await CardView.countDocuments({ card: card._id });

    return res.status(200).json({
      success: true,
      message: 'Total views fetched successfully',
      card: username,
      totalViews,
    });

  } catch (error) {
    console.error('❌ Error in getTotalViews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getUniqueViews = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found or inactive' });
    }

    // 🔍 Aggregate unique views based on IP + browser
    const uniqueViews = await CardView.aggregate([
      { $match: { card: card._id } },
      {
        $group: {
          _id: { ipAddress: "$ipAddress", browser: "$browser" },
        }
      },
      { $count: "uniqueViewCount" }
    ]);

    return res.status(200).json({
      success: true,
      message: 'Unique views fetched successfully',
      card: username,
      uniqueViews: uniqueViews[0]?.uniqueViewCount || 0,
    });

  } catch (error) {
    console.error('❌ Error in getUniqueViews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getViewsOverTime = async (req, res) => {
  try {
    const { username } = req.params;
    const { period = 'day' } = req.query; // period = 'day' | 'week' | 'month'

    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found or inactive' });
    }

    // Define the date format based on period
    let dateFormat;
    if (period === 'month') dateFormat = '%Y-%m';
    else if (period === 'week') dateFormat = '%Y-%U'; // year-week
    else dateFormat = '%Y-%m-%d'; // default: day

    const views = await CardView.aggregate([
      { $match: { card: card._id } },
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: "$viewedAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.status(200).json({
      success: true,
      period,
      data: views.map(v => ({ date: v._id, views: v.count }))
    });

  } catch (error) {
    console.error('❌ Error in getViewsOverTime:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getDeviceStats = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate card
    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Aggregate data
    const stats = await CardView.aggregate([
      { $match: { card: card._id } },
      {
        $group: {
          _id: null,
          os: { $push: "$os" },
          browsers: { $push: "$browser" },
          devices: { $push: "$deviceType" }
        }
      },
      {
        $project: {
          os: {
            $arrayToObject: {
              $map: {
                input: { $setUnion: ["$os", []] },
                as: "item",
                in: {
                  k: "$$item",
                  v: {
                    $size: {
                      $filter: {
                        input: "$os",
                        as: "i",
                        cond: { $eq: ["$$i", "$$item"] }
                      }
                    }
                  }
                }
              }
            }
          },
          browsers: {
            $arrayToObject: {
              $map: {
                input: { $setUnion: ["$browsers", []] },
                as: "item",
                in: {
                  k: "$$item",
                  v: {
                    $size: {
                      $filter: {
                        input: "$browsers",
                        as: "i",
                        cond: { $eq: ["$$i", "$$item"] }
                      }
                    }
                  }
                }
              }
            }
          },
          devices: {
            $arrayToObject: {
              $map: {
                input: { $setUnion: ["$devices", []] },
                as: "item",
                in: {
                  k: "$$item",
                  v: {
                    $size: {
                      $filter: {
                        input: "$devices",
                        as: "i",
                        cond: { $eq: ["$$i", "$$item"] }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      username,
      stats: stats[0] || { os: {}, browsers: {}, devices: {} }
    });

  } catch (err) {
    console.error('getDeviceStats error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getGeoStats = async (req, res) => {
  try {
    const { username } = req.params;

    const card = await Card.findOne({ username, public: true, isActive: true });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const views = await CardView.find({ card: card._id });

    const geoStats = {
      countries: {},
      regions: {},
      cities: {}
    };

    for (const view of views) {
      const { geo } = view;

      if (geo?.country) {
        geoStats.countries[geo.country] = (geoStats.countries[geo.country] || 0) + 1;
      }
      if (geo?.region) {
        geoStats.regions[geo.region] = (geoStats.regions[geo.region] || 0) + 1;
      }
      if (geo?.city) {
        geoStats.cities[geo.city] = (geoStats.cities[geo.city] || 0) + 1;
      }
    }

    return res.status(200).json({
      success: true,
      username,
      geoStats
    });

  } catch (error) {
    console.error('❌ Error in getGeoStats:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
