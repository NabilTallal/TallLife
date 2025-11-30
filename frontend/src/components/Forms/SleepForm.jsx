import React, { useState } from "react";
import { useSleepStore } from "../../stores/sleep.store.js";
import toast from "react-hot-toast";

const SleepForm = ({ userId, onSuccess }) => {
    const [formData, setFormData] = useState({
        sleepHours: "",
        energyLevel: 3,
        quality: 5,
        note: "",
        date: new Date().toISOString().split("T")[0],
    });

    const { addSleep, loading } = useSleepStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sleepHoursNum = parseFloat(formData.sleepHours);
        const energyLevelNum = parseInt(formData.energyLevel);
        const qualityNum = parseInt(formData.quality);

        if (isNaN(sleepHoursNum) || sleepHoursNum < 0 || sleepHoursNum > 24) {
            toast.error("Please enter a valid number of hours (0-24)");
            return;
        }

        try {
            await addSleep({
                userId,
                sleepHours: sleepHoursNum,
                energyLevel: energyLevelNum,
                quality: qualityNum,
                note: formData.note,
                date: new Date(formData.date),
            });

            setFormData({
                sleepHours: "",
                energyLevel: 3,
                quality: 5,
                note: "",
                date: new Date().toISOString().split("T")[0],
            });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error logging sleep:", error);
            toast.error("Failed to log sleep");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-8 border-2 border-orange-200">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">😴</span>
                </div>
                <h2 className="text-3xl font-bold text-orange-800">Log Your Sleep</h2>
                <p className="text-orange-600 mt-2">Track your rest and recovery</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sleep Hours */}
                <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                        ⏰ Hours Slept *
                    </label>
                    <input
                        type="number"
                        name="sleepHours"
                        value={formData.sleepHours}
                        onChange={handleInputChange}
                        placeholder="e.g. 7.5"
                        min="0"
                        max="24"
                        step="0.25"
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 text-orange-800 placeholder-orange-300 disabled:opacity-50"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Energy Level */}
                <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                        ⚡ Energy Level (1–5)
                    </label>
                    <select
                        name="energyLevel"
                        value={formData.energyLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 text-orange-800 disabled:opacity-50"
                        disabled={loading}
                    >
                        <option value="1">1 - Very Low</option>
                        <option value="2">2 - Low</option>
                        <option value="3">3 - Moderate</option>
                        <option value="4">4 - High</option>
                        <option value="5">5 - Very High</option>
                    </select>
                </div>

                {/* Sleep Quality */}
                <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                        🌟 Sleep Quality (1–10)
                    </label>
                    <input
                        type="range"
                        name="quality"
                        value={formData.quality}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className="w-full range range-warning"
                        disabled={loading}
                    />
                    <div className="flex justify-between text-xs text-orange-600 mt-1">
                        <span>Poor</span>
                        <span className="font-bold text-lg">{formData.quality}/10</span>
                        <span>Excellent</span>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                        📅 Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 text-orange-800 disabled:opacity-50"
                        disabled={loading}
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                        📝 Note (Optional)
                    </label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="How was your sleep? Any dreams or disturbances?"
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 text-orange-800 placeholder-orange-300 resize-none disabled:opacity-50"
                        disabled={loading}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!formData.sleepHours || loading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                        formData.sleepHours && !loading
                            ? "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform hover:scale-105"
                            : "bg-gradient-to-r from-orange-300 to-orange-400 cursor-not-allowed opacity-50"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="loading loading-spinner loading-sm"></div>
                            Saving...
                        </span>
                    ) : (
                        "Log Sleep 🌙"
                    )}
                </button>
            </form>
        </div>
    );
};

export default SleepForm;