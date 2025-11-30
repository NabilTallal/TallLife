// components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store.js";

const Sidebar = () => {
    const { authUser, logout } = useAuthStore();
    const location = useLocation();

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/moods", label: "Moods", icon: "😊" },
        { path: "/habits", label: "Habits", icon: "💪" },
        { path: "/sleep", label: "Sleep", icon: "😴" },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className="w-80 bg-gradient-to-b from-yellow-500 to-yellow-600 shadow-2xl p-6 flex flex-col min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full -translate-x-12 translate-y-12"></div>

            {/* Header */}
            <div className="relative z-10 mb-12">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-amber-200">🌱</span>
                    TallLife
                </h1>
                <p className="text-yellow-100 text-sm opacity-80">Your wellness journey</p>
            </div>

            {/* User Info */}
            <div className="relative z-10 mb-8 p-4 bg-yellow-400/20 rounded-2xl backdrop-blur-sm border border-yellow-300/30">
                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-sm font-bold">
                                {authUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                            {authUser?.fullName || 'User'}
                        </p>
                        <p className="text-yellow-100 text-xs opacity-80 truncate">
                            {authUser?.email || 'Welcome back!'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                            isActivePath(item.path)
                                ? 'bg-white text-yellow-600 shadow-lg transform scale-105'
                                : 'text-yellow-100 hover:bg-yellow-400/30 hover:text-white hover:shadow-md'
                        }`}
                    >
                        <span className={`text-xl transition-transform duration-300 ${
                            isActivePath(item.path) ? 'transform scale-110' : 'group-hover:scale-110'
                        }`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                        {isActivePath(item.path) && (
                            <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="relative z-10 mt-8">
                <button
                    onClick={logout}
                    className="btn btn-outline w-full border-yellow-200 text-yellow-100 hover:bg-yellow-200 hover:text-yellow-700 hover:border-yellow-200 gap-2 group"
                >
                    <span className="text-lg group-hover:scale-110 transition-transform">🚪</span>
                    Logout
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-6 pt-4 border-t border-yellow-400/30">
                <p className="text-yellow-200/60 text-xs text-center">
                    Take care of your mind 🌟
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;