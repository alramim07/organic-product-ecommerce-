import Visitor from "../models/Visitor.js";

// Helper to get formatted YYYY-MM-DD for today in local timezone
const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Record visit
export const recordVisit = async (req, res) => {
  try {
    let clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "127.0.0.1";

    // Clean IPv6 mapped IPv4 or localhost
    if (clientIp.startsWith("::ffff:")) {
      clientIp = clientIp.substring(7);
    }
    if (clientIp === "::1") {
      clientIp = "127.0.0.1";
    }

    const todayDate = getTodayDateString();
    const userAgent = req.headers["user-agent"] || "";

    // Insert only if not already recorded today for this IP
    try {
      await Visitor.updateOne(
        { ip: clientIp, dateString: todayDate },
        {
          $setOnInsert: {
            ip: clientIp,
            dateString: todayDate,
            userAgent,
            visitedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } catch (e) {
      // Ignore duplicate key error in concurrent calls
    }

    // Calculate stats
    const todaysVisitors = await Visitor.countDocuments({
      dateString: todayDate,
    });
    const totalVisitors = await Visitor.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        todaysVisitors,
        totalVisitors,
        clientIp,
        todayDate,
      },
    });
  } catch (error) {
    console.error("Error in recordVisit:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get stats
export const getVisitorStats = async (req, res) => {
  try {
    const todayDate = getTodayDateString();
    const todaysVisitors = await Visitor.countDocuments({
      dateString: todayDate,
    });
    const totalVisitors = await Visitor.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        todaysVisitors,
        totalVisitors,
      },
    });
  } catch (error) {
    console.error("Error in getVisitorStats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
