import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaLeaf,
  FaChartPie,
  FaBoxes,
  FaPlusCircle,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserShield,
  FaLayerGroup,
  FaStar,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminUser, logoutAdmin, bookings, products, settings, reviewsStats } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // By default sidebar starts collapsed on page load/reload
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Update browser document title dynamically
  useEffect(() => {
    if (settings?.businessName) {
      document.title = `${settings.businessName} - Admin Portal`;
    }
  }, [settings?.businessName]);

  // When user navigates to another page, collapse sidebar back
  useEffect(() => {
    setIsLockedOpen(false);
    setIsHovered(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleCollapse = () => {
    setIsLockedOpen((prev) => !prev);
    setIsHovered(false);
  };

  // Expanded if either locked open via burger button or currently hovered on desktop
  const isExpanded = isLockedOpen || isHovered;
  const isCollapsed = !isExpanded;

  // Count pending bookings
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  const handleLogout = () => {
    Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to log out from the Admin Portal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        logoutAdmin();
        navigate("/admin/login");
      }
    });
  };

  const navItems = [
    {
      to: "/admin",
      end: true,
      icon: <FaChartPie className="text-lg" />,
      label: "Dashboard",
    },
    {
      to: "/admin/products",
      end: true,
      icon: <FaBoxes className="text-lg" />,
      label: "Product List",
      badge: products.length,
    },
    {
      to: "/admin/products/add",
      icon: <FaPlusCircle className="text-lg" />,
      label: "Add Product",
    },
    {
      to: "/admin/categories",
      icon: <FaLayerGroup className="text-lg" />,
      label: "Categories & Units",
    },
    {
      to: "/admin/bookings",
      icon: <FaClipboardList className="text-lg" />,
      label: "Orders",
      badge: pendingCount > 0 ? `${pendingCount} New` : null,
      badgeColor: "bg-red-500",
    },
    {
      to: "/admin/reviews",
      icon: <FaStar className="text-lg" />,
      label: "Reviews",
      badge: reviewsStats?.pending > 0 ? `${reviewsStats.pending} New` : null,
      badgeColor: "bg-amber-500",
    },
    {
      to: "/admin/settings",
      icon: <FaCog className="text-lg" />,
      label: "Settings",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 admin-theme-scope"
      style={{
        "--admin-sidebar-bg": settings?.themeSidebarBg || "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)",
        "--admin-primary-btn": settings?.themePrimaryBtn || "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)",
        "--admin-secondary-btn": settings?.themeSecondaryBtn || "linear-gradient(135deg, #d97706 0%, #eab308 100%)",
      }}
    >
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Permanently Sticky / Fixed Sidebar with Smooth Hover and Collapse */}
      <aside
        onMouseEnter={() => !isLockedOpen && setIsHovered(true)}
        onMouseLeave={() => !isLockedOpen && setIsHovered(false)}
        style={{
          background: settings?.themeSidebarBg || "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)",
        }}
        className={`fixed top-0 bottom-0 left-0 h-screen text-white flex flex-col justify-between transition-all duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          sidebarOpen ? "translate-x-0 z-50" : "-translate-x-full lg:translate-x-0"
        } ${
          isExpanded
            ? "w-72 z-50 shadow-2xl"
            : "lg:w-20 w-72 z-40"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className={`border-b border-white/10 flex items-center transition-all ${
            isCollapsed ? "p-4 justify-center" : "p-5 justify-between"
          }`}>
            <Link
              to="/admin"
              className="flex items-center gap-3 min-w-0"
              title={settings?.businessName || "Ammwala Portal"}
            >
              {/* Brand Icon or Uploaded Logo / Favicon */}
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
                {settings?.logo ? (
                  <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : settings?.favicon ? (
                  <img src={settings.favicon} alt="Favicon" className="w-full h-full object-cover" />
                ) : (
                  <FaLeaf className="text-white text-xl" />
                )}
              </div>

              {!isCollapsed && (
                <div className="overflow-hidden transition-all duration-300 min-w-0">
                  <h2 className="font-extrabold text-base text-white leading-tight truncate max-w-[155px]">
                    {settings?.businessName || "Ammwala Portal"}
                  </h2>
                  <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider block truncate">
                    Admin Dashboard
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white cursor-pointer ml-auto"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl font-bold text-sm transition-all group ${
                    isCollapsed ? "justify-center px-2 py-3.5" : "justify-between px-4 py-3"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-green-950 shadow-lg font-black"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {item.badge && (
                  isCollapsed ? (
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  ) : (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full text-white font-black ${
                        item.badgeColor || "bg-white/20"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {/* Visit Live Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View Live Website"
            className={`flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-white/20 text-yellow-300 rounded-xl text-xs font-bold transition ${
              isCollapsed ? "px-2" : "px-4"
            }`}
          >
            <FaExternalLinkAlt className="text-sm shrink-0" />
            {!isCollapsed && <span>View Live Website</span>}
          </Link>

          {/* User profile & logout */}
          <div className={`pt-2 flex items-center justify-between ${isCollapsed ? "flex-col gap-2" : "px-2"}`}>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full bg-yellow-400 text-green-950 font-bold flex items-center justify-center text-xs shrink-0 shadow overflow-hidden"
                title={settings?.ownerName || adminUser?.email || "admin@test.com"}
              >
                {settings?.profilePic ? (
                  <img src={settings.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-sm">
                    {(settings?.ownerName?.[0] || "A").toUpperCase()}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">
                    {settings?.ownerName || adminUser?.email || "admin@test.com"}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    {settings?.ownerName ? "Store Owner" : "Super Admin"}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
            >
              <FaSignOutAlt className="text-base" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 min-h-screen bg-gray-50 transition-all duration-300 ${
        isLockedOpen ? "lg:pl-72" : "lg:pl-20"
      }`}>
        {/* Sticky Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Desktop Hamburger Toggle (Click locks open / unlocks) */}
            <button
              type="button"
              onClick={toggleCollapse}
              className={`hidden lg:flex items-center justify-center p-2 rounded-xl transition cursor-pointer text-lg ${
                isLockedOpen
                  ? "bg-green-100 text-green-900"
                  : "text-gray-600 hover:text-green-800 hover:bg-gray-100"
              }`}
              title={isLockedOpen ? "Collapse Sidebar" : "Keep Sidebar Open"}
            >
              <FaBars />
            </button>

            {/* Mobile Sidebar Drawer Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-green-800 text-xl cursor-pointer p-1"
            >
              <FaBars />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs text-gray-400 font-medium">Admin Management /</span>
              <h1 className="text-base font-extrabold text-green-900 capitalize">
                {location.pathname === "/admin"
                  ? "Dashboard Overview"
                  : location.pathname.includes("/products/add")
                  ? "Add New Product"
                  : location.pathname.includes("/products/edit")
                  ? "Edit Product"
                  : location.pathname.includes("/products")
                  ? "Product List"
                  : location.pathname.includes("/categories")
                  ? "Categories & Units"
                  : location.pathname.includes("/bookings")
                  ? "Orders"
                  : location.pathname.includes("/reviews")
                  ? "Customer Reviews"
                  : location.pathname.includes("/settings")
                  ? "Settings"
                  : "Admin Panel"}
              </h1>
            </div>
          </div>

          {/* Topbar Right Controls */}
          <div className="flex items-center gap-3">
            {/* Pending Orders Pill */}
            {pendingCount > 0 && (
              <Link
                to="/admin/bookings"
                className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 text-red-700 rounded-full text-xs font-bold hover:bg-red-100 transition animate-pulse"
              >
                <FaBell className="text-xs" />
                <span>{pendingCount} Pending Orders</span>
              </Link>
            )}

            {/* Visit Site */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold hover:bg-green-100 transition"
            >
              <FaExternalLinkAlt className="text-xs" /> <span>Live Site</span>
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-700 to-green-900 text-yellow-300 font-bold flex items-center justify-center text-xs shadow overflow-hidden">
                {settings?.profilePic ? (
                  <img src={settings.profilePic} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-extrabold text-sm text-yellow-300">
                    {(settings?.ownerName?.[0] || "A").toUpperCase()}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-xs font-bold text-gray-700">
                {settings?.ownerName || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
