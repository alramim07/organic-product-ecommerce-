import Setting from "../models/Setting.js";
import fs from "fs";
import path from "path";

const storageDir = path.resolve("data");
const settingsFile = path.join(storageDir, "settings_storage.json");

const persistSettingsToDisk = (data) => {
  try {
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    const cleanData = data?.toObject ? data.toObject() : { ...data };
    delete cleanData._id;
    delete cleanData.__v;
    fs.writeFileSync(settingsFile, JSON.stringify(cleanData, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to backup settings to disk:", err.message);
  }
};

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne().lean();

    if (!setting) {
      let initialData = {};
      if (fs.existsSync(settingsFile)) {
        try {
          const raw = fs.readFileSync(settingsFile, "utf-8");
          initialData = JSON.parse(raw);
          delete initialData._id;
          delete initialData.__v;
        } catch (e) {
          // fallback
        }
      }
      setting = await Setting.create(initialData);
    }

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch settings",
    });
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res) => {
  try {
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;

    // Use findOneAndUpdate to avoid Mongoose VersionError on concurrent requests
    const setting = await Setting.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    );

    // Persist to local disk so restarts never lose custom settings/media
    persistSettingsToDisk(setting);

    res.json({
      success: true,
      message: "Settings successfully updated!",
      data: setting,
    });
  } catch (error) {
    console.error("Error updating settings:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update settings",
    });
  }
};
