import { useState } from "react";
import { useAuthStore } from "../stores/auth.store.js";
import { MailIcon, LockIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
            {/* Ambient floating glow */}
            <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-3xl animate-pulse-slow rounded-full -top-32 -left-32"></div>
            <div className="absolute w-[400px] h-[400px] bg-amber-400/15 blur-3xl animate-pulse-slow rounded-full -bottom-32 -right-32 animation-delay-2000"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                {/* Card with gradient border */}
                <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-[2px] shadow-2xl">
                    <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 backdrop-blur-sm border border-yellow-100">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white">
                                <span className="text-2xl text-white">🌱</span>
                            </div>
                            <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back</h2>
                            <p className="text-amber-700">Sign in to your TallLife account</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-800 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <MailIcon className="absolute left-4 top-3.5 w-5 h-5 text-amber-500" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-900 placeholder-amber-400 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-800 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <LockIcon className="absolute left-4 top-3.5 w-5 h-5 text-amber-500" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-900 placeholder-amber-400 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                                    !isLoggingIn
                                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transform hover:scale-105"
                                        : "bg-gradient-to-r from-yellow-300 to-amber-400 cursor-not-allowed"
                                }`}
                            >
                                {isLoggingIn ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <LoaderIcon className="w-5 h-5 animate-spin" />
                                        Signing In...
                                    </span>
                                ) : (
                                    "Sign In →"
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-amber-700">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-bold text-amber-600 hover:text-amber-700 underline transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}