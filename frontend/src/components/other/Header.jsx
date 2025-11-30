// components/Header.jsx
import React from "react";
import { useAuthStore } from "../../stores/auth.store.js";

const Header = ({ title = "Dashboard Overview" }) => {
    const { authUser } = useAuthStore();

    return (
        <header className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full -translate-x-6 translate-y-6"></div>

            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {authUser?.fullName || "User"}! 👋
                </h2>
                <p className="text-yellow-100 text-lg opacity-90">{title}</p>
            </div>

            <div className="relative z-10 flex items-center gap-4">
                <div className="text-right">
                    <p className="text-yellow-100 font-medium">{new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                    <p className="text-yellow-200 text-sm">Have a wonderful day! 🌟</p>
                </div>
                <div className="avatar placeholder">
                    <div className="bg-yellow-400 text-yellow-900 rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg">
                        <span className="font-bold text-lg">
                            {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;