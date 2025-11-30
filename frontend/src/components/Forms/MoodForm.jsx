import React, { useState } from "react";
import { useMoodStore } from "../../stores/mood.store.js";

const MoodForm = ({ userId, onSuccess }) => {
    const { addMood, loading } = useMoodStore();

    const [formData, setFormData] = useState({
        mood: "",
        note: "",
        tags: [],
        date: new Date().toISOString().split("T")[0],
    });

    const [tagInput, setTagInput] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMoodSelect = (value) => {
        setFormData((prev) => ({ ...prev, mood: value }));
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
        }
        setTagInput("");
    };

    const removeTag = (tag) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMood({
                userId,
                ...formData,
                mood: Number(formData.mood),
            });

            setFormData({
                mood: "",
                note: "",
                tags: [],
                date: new Date().toISOString().split("T")[0],
            });
            setTagInput("");

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding mood:", error);
        }
    };

    const moodEmojis = {
        1: "😢", 2: "😔", 3: "😕", 4: "😐", 5: "😊",
        6: "😄", 7: "🤩", 8: "🥳", 9: "😍", 10: "🤯",
    };

    const moodLabels = {
        1: "Awful", 2: "Bad", 3: "Poor", 4: "Neutral", 5: "Okay",
        6: "Good", 7: "Great", 8: "Excellent", 9: "Amazing", 10: "Perfect",
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-8 border-2 border-yellow-200">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">😊</span>
                </div>
                <h2 className="text-3xl font-bold text-yellow-800">How are you feeling?</h2>
                <p className="text-yellow-600 mt-2">Track your daily mood</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* MOOD SELECT */}
                <div className="space-y-4">
                    <label className="block text-lg font-semibold text-yellow-700 text-center">
                        Mood Level *
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                        {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                            <button
                                key={value}
                                type="button"
                                disabled={loading}
                                onClick={() => handleMoodSelect(value.toString())}
                                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                                    formData.mood === value.toString()
                                        ? "bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-600 scale-110 shadow-lg text-white"
                                        : "bg-white border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 hover:scale-105 text-yellow-700"
                                }`}
                            >
                                <span className="font-bold text-sm">{value}</span>
                                <span className="text-xl">{moodEmojis[value]}</span>
                            </button>
                        ))}
                    </div>
                    {formData.mood && (
                        <p className="text-center text-lg font-semibold text-yellow-600 bg-yellow-100 py-2 rounded-lg">
                            {moodLabels[formData.mood]}
                        </p>
                    )}
                </div>

                {/* DATE */}
                <div>
                    <label className="block text-sm font-semibold text-yellow-700 mb-2">
                        📅 Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-yellow-400 text-yellow-800 placeholder-yellow-300 disabled:opacity-50"
                    />
                </div>

                {/* NOTE */}
                <div>
                    <label className="block text-sm font-semibold text-yellow-700 mb-2">
                        📝 Notes (Optional)
                    </label>
                    <textarea
                        name="note"
                        rows={3}
                        value={formData.note}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="How was your day? What made you feel this way?"
                        className="w-full px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-yellow-400 text-yellow-800 placeholder-yellow-300 resize-none disabled:opacity-50"
                    />
                </div>

                {/* TAGS */}
                <div>
                    <label className="block text-sm font-semibold text-yellow-700 mb-2">
                        🏷️ Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                            disabled={loading}
                            placeholder="Add a tag..."
                            className="flex-1 px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-yellow-400 text-yellow-800 placeholder-yellow-300 disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            disabled={loading}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg"
                        >
                            Add
                        </button>
                    </div>
                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-sm font-medium shadow-md"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        disabled={loading}
                                        className="ml-2 text-white hover:text-yellow-200 text-lg font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={!formData.mood || loading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                        formData.mood && !loading
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105"
                            : "bg-gradient-to-r from-yellow-300 to-yellow-400 cursor-not-allowed opacity-50"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="loading loading-spinner loading-sm"></div>
                            Saving...
                        </span>
                    ) : (
                        "Save Mood Entry ✨"
                    )}
                </button>
            </form>
        </div>
    );
};

export default MoodForm;