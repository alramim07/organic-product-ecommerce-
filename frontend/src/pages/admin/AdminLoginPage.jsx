import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaLeaf,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin, isAuthenticated, settings } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.businessName) {
      document.title = `${settings.businessName} - Admin Login`;
    }
  }, [settings?.businessName]);

  // If already logged in, redirect to admin safely via useEffect
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdmin(email.trim(), password);
      if (res.success) {
        navigate("/admin", { replace: true });
      } else {
        setError(res.message || "Invalid email or password! Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-amber-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-yellow-200/50 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          {settings?.websiteLogo || settings?.logo || settings?.websiteFavicon ? (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-3 overflow-hidden bg-white border border-yellow-200 p-1.5">
              <img
                src={settings?.websiteLogo || settings?.logo || settings?.websiteFavicon}
                alt={settings?.businessName || "Business Logo"}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallback = e.target.parentElement?.querySelector(".fallback-leaf");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="fallback-leaf hidden w-full h-full bg-gradient-to-br from-yellow-400 to-green-600 rounded-xl flex items-center justify-center text-white text-3xl">
                <FaLeaf />
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-green-600 rounded-2xl shadow-lg mb-3">
              <FaLeaf className="text-white text-3xl" />
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900">
            {settings?.businessName || settings?.siteName || "Ammwala Admin Portal"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Sign in to manage catalog, orders, and website settings
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-start gap-2 shadow-sm animate-in fade-in">
            <FaExclamationCircle className="text-red-500 text-sm mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
                loading ? "opacity-75 cursor-wait" : ""
              }`}
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <FaShieldAlt /> <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center border-t border-gray-100 pt-4">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-green-800 font-semibold transition"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
