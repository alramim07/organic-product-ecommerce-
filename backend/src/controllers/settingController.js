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
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res) => {
  let setting = await Setting.findOne();

  if (!setting) {
    setting = await Setting.create(req.body);
  } else {
    Object.assign(setting, req.body);
    await setting.save();
  }

  // Persist to local disk so restarts never lose custom settings/media
  persistSettingsToDisk(setting);

  res.json({
    success: true,
    message: "Settings successfully updated!",
    data: setting,
  });
};
