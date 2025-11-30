import React, { useState } from "react";
import { useHabitStore } from "../../stores/habit.store.js";
import toast from "react-hot-toast";

const HabitForm = ({ userId, onSuccess }) => {
    const [formData, setFormData] = useState({
        habit: "",
        note: "",
        tags: [],
        date: new Date().toISOString().split("T")[0],
        startTime: "08:00",
        endTime: "08:30",
    });
    const [tagInput, setTagInput] = useState("");
    const { addHabit, loading } = useHabitStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tagToRemove),
        }));
    };

    const handleTagInputKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.habit) {
            toast.error("Please fill in the habit name");
            return;
        }

        const start = new Date(`${formData.date}T${formData.startTime}`);
        const end = new Date(`${formData.date}T${formData.endTime}`);
        const duration = Math.max((end - start) / 60000, 1);

        try {
            await addHabit({
                userId,
                habit: formData.habit,
                note: formData.note,
                tags: formData.tags,
                startTime: start,
                endTime: end,
                duration,
                date: new Date(formData.date),
            });

            setFormData({
                habit: "",
                note: "",
                tags: [],
                date: new Date().toISOString().split("T")[0],
                startTime: "08:00",
                endTime: "08:30",
            });
            setTagInput("");

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding habit:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">💪</span>
                </div>
                <h2 className="text-3xl font-bold text-amber-800">Build a New Habit</h2>
                <p className="text-amber-600 mt-2">Track your daily routines</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Habit Name */}
                <div>
                    <label className="block text-sm font-semibold text-amber-700 mb-2">
                        🎯 Habit Name *
                    </label>
                    <input
                        type="text"
                        name="habit"
                        value={formData.habit}
                        onChange={handleInputChange}
                        placeholder="e.g., Morning Exercise, Reading, Meditation"
                        className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 placeholder-amber-300 disabled:opacity-50"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-semibold text-amber-700 mb-2">
                        📅 Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 disabled:opacity-50"
                        disabled={loading}
                    />
                </div>

                {/* Start & End Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-amber-700 mb-2">
                            ⏰ Start Time
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 disabled:opacity-50"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-amber-700 mb-2">
                            ⏰ End Time
                        </label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 disabled:opacity-50"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm font-semibold text-amber-700 mb-2">
                        📝 Note (Optional)
                    </label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Additional details about your habit..."
                        className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 placeholder-amber-300 resize-none disabled:opacity-50"
                        disabled={loading}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-semibold text-amber-700 mb-2">
                        🏷️ Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={handleTagInputKeyPress}
                            placeholder="Add a tag..."
                            className="flex-1 px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 text-amber-800 placeholder-amber-300 disabled:opacity-50"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg"
                            disabled={loading}
                        >
                            Add
                        </button>
                    </div>
                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full text-sm font-medium shadow-md"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-white hover:text-amber-200 text-lg font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!formData.habit || loading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                        formData.habit && !loading
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 transform hover:scale-105"
                            : "bg-gradient-to-r from-amber-300 to-amber-400 cursor-not-allowed opacity-50"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="loading loading-spinner loading-sm"></div>
                            Saving...
                        </span>
                    ) : (
                        "Add Habit 🚀"
                    )}
                </button>
            </form>
        </div>
    );
};

export default HabitForm;