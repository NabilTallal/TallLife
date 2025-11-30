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
        <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-lime-50">
            {/* Ambient floating glow */}
            <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-3xl animate-pulse-slow rounded-full"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/30 to-transparent shadow-[0_0_60px_rgba(255,230,150,0.3)] backdrop-blur-md opacity-95">
                <div className="rounded-2xl bg-white/70 p-8 backdrop-blur-xl border border-yellow-300/20 shadow-[0_0_20px_rgba(255,230,150,0.2)]">

                    {/* Header */}
                    <div className="text-center mb-8 flex flex-col items-center relative">
                        <div className="relative mb-4 w-24 h-24 flex items-center justify-center rounded-full bg-yellow-200/50 border border-yellow-300/30 shadow-[0_0_35px_rgba(255,230,150,0.3)] animate-float">
                            <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-300/20 animate-pulse-slow"></div>
                            <img
                                src="/logo.png"
                                alt="TallLife Logo"
                                className="w-16 h-16 drop-shadow-[0_0_15px_rgba(255,230,150,0.8)] animate-glow"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
                        <p className="text-gray-600 text-sm">Login to access your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-2 rounded-md bg-yellow-400/80 text-gray-900 font-medium hover:bg-yellow-400/100 transition disabled:opacity-50 shadow-[0_0_15px_rgba(255,230,150,0.3)]"
                        >
                            {isLoggingIn ? <LoaderIcon className="h-5 w-5 animate-spin mx-auto" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link to="/signup" className="text-sm text-gray-700 hover:text-gray-900 transition">
                            Don’t have an account? <span className="text-yellow-500 font-semibold">Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
