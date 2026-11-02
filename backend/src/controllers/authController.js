import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "ammwala_super_secret_jwt_key_2026_secured",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password.",
    });
  }

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password! Please check your credentials.",
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password! Please check your credentials.",
    });
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    message: "Login successful!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// @desc    Change admin password
// @route   PUT /api/auth/change-password
// @access  Private (Admin)
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    // Password validation rule check on server side
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8;

    if (!hasUpper || !hasLower || !hasNumber || !hasSymbol || !isLongEnough) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.",
      });
    }

    let user = await User.findById(req.user._id).select("+password");
    if (!user) {
      user = await User.findOne({
        $or: [
          { email: process.env.ADMIN_EMAIL || "admin@test.com" },
          { role: "superadmin" },
        ],
      }).select("+password");
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password does not match.",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
