import { useState } from "react";
import { useAuthStore } from "../stores/auth.store.js";
import { LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-white">
            {/* Ambient floating glow */}
            <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-3xl animate-pulse-slow rounded-full"></div>

            {/* Signup Card */}
            <div className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/30 to-transparent shadow-[0_0_60px_rgba(255,230,150,0.3)] backdrop-blur-md opacity-95">
                <div className="rounded-2xl bg-white/70 p-8 backdrop-blur-xl border border-yellow-300/20 shadow-[0_0_20px_rgba(255,230,150,0.2)]">

                    {/* Header */}
                    <div className="text-center mb-8 flex flex-col items-center relative">
                        <div className="mx-auto w-28 h-28 rounded-full bg-yellow-200/50 flex items-center justify-center mb-6 border border-yellow-300/30 shadow-[0_0_30px_rgba(255,230,150,0.25)] animate-float">
                            <img
                                src="/logo.png"
                                alt="TallLife Logo"
                                className="w-16 h-16 drop-shadow-[0_0_12px_rgba(255,230,150,0.8)] animate-float"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600 text-sm">Sign up for a new account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/30 border border-yellow-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/30 border border-yellow-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/30 border border-yellow-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className="w-full py-2 rounded-md bg-yellow-400/80 text-gray-900 font-medium hover:bg-yellow-400/100 transition disabled:opacity-50 shadow-[0_0_15px_rgba(255,230,150,0.3)]"
                        >
                            {isSigningUp ? (
                                <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Link */}
                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900 transition">
                            Already have an account? <span className="text-yellow-500 font-semibold">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
