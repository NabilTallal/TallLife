import React, {useEffect} from "react";
import {useMoodStore} from "../stores/mood.store.js";
import {useHabitStore} from "../stores/habit.store.js";
import {useSleepStore} from "../stores/sleep.store.js";
import Sidebar from "../components/other/Sidebar.jsx";
import Header from "../components/other/Header.jsx";
import StatCard from "../components/other/StatCard.jsx";


const Dashboard = () => {
    const {
        moods,
        getMoods,
        loading: moodsLoading,
        analytics: moodAnalytics,
        getAnalytics: getMoodAnalytics,
        getFullAnalytics : moodFullAnalytics,
    } = useMoodStore();

    const {
        habits,
        getHabits,
        loading: habitsLoading,
        analytics: habitAnalytics,
        getAnalytics: getHabitAnalytics,
        getHabitLeaderboard,
        habitLeaderboard
    } = useHabitStore();

    const {
        sleepRecords,
        getSleeps,
        loading: sleepLoading,
        analytics: sleepAnalytics,
        getAnalytics: getSleepAnalytics,
    } = useSleepStore();


    useEffect(() => {
        getMoods();
        getHabits();
        getSleeps()
        getMoodAnalytics();
        getHabitAnalytics();
        getSleepAnalytics();
        getHabitLeaderboard();
    }, []);

    const isLoading = moodsLoading || habitsLoading || sleepLoading;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-yellow-500 via-white to-amber-400">
            <Sidebar/>
            <main className="flex-1 p-8">
                <Header/>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg text-yellow-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Moods */}
                        <StatCard
                            title="Recent Moods"
                            icon="😊"
                            colorClass={{
                                bg: "bg-gradient-to-br from-yellow-400 to-yellow-500",
                                text: "text-white",
                                textLight: "text-yellow-100",
                                card: "bg-yellow-50 border-yellow-200"
                            }}
                            data={moods?.slice(0, 5) || []}
                            emptyText="No moods logged yet. Start tracking your mood! 🌈"
                            renderItem={(m) => (
                                <li key={m._id}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-yellow-100 hover:shadow-md hover:border-yellow-300 transition-all duration-300 group">
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                                            m.mood >= 7 ? 'bg-green-100 text-green-600 border-2 border-green-200' :
                                                m.mood >= 4 ? 'bg-yellow-100 text-yellow-600 border-2 border-yellow-200' :
                                                    'bg-red-100 text-red-600 border-2 border-red-200'
                                        }`}>
                                        {m.mood}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 truncate">{m.note || "How you're feeling"}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {m.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {m.tags.slice(0, 2).map((tag, index) => (
                                                        <span key={index}
                                                              className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className="text-gray-500 text-sm flex-shrink-0">{new Date(m.date).toLocaleDateString()}</span>
                                </li>
                            )}
                        />

                        {/* Habits */}
                        <StatCard
                            title="Habits"
                            icon="💪"
                            colorClass={{
                                bg: "bg-gradient-to-br from-amber-400 to-amber-500",
                                text: "text-white",
                                textLight: "text-amber-100",
                                card: "bg-amber-50 border-amber-200"
                            }}
                            data={habits?.slice(0, 5) || []}
                            emptyText="No habits tracked yet. Build amazing habits! ⚡"
                            renderItem={(h) => (
                                <li key={h._id}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-300 transition-all duration-300 group">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-amber-600 text-lg font-bold">
                                        🔄
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 truncate">{h.habit}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span
                                                className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{h.frequency}</span>
                                            {h.note && <span className="text-gray-600 text-sm truncate">{h.note}</span>}
                                        </div>
                                    </div>
                                    <span
                                        className="text-gray-500 text-sm flex-shrink-0">{new Date(h.date).toLocaleDateString()}</span>
                                </li>
                            )}
                        />

                        {/* Sleep */}
                        <StatCard
                            title="Sleep"
                            icon="😴"
                            colorClass={{
                                bg: "bg-gradient-to-br from-orange-400 to-orange-500",
                                text: "text-white",
                                textLight: "text-orange-100",
                                card: "bg-orange-50 border-orange-200"
                            }}
                            data={sleepRecords?.slice(0, 5) || []}
                            emptyText="No sleep entries yet. Track your rest! 🌙"
                            renderItem={(s) => (
                                <li key={s._id}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-300 transition-all duration-300 group">
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                                            s.quality >= 7 ? 'bg-green-100 text-green-600 border-green-200' :
                                                s.quality >= 4 ? 'bg-orange-100 text-orange-600 border-orange-200' :
                                                    'bg-red-100 text-red-600 border-red-200'
                                        }`}>
                                        {s.sleepHours}h
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800">Quality: {s.quality}/10</p>
                                        {s.note && <span className="text-gray-600 text-sm truncate">{s.note}</span>}
                                    </div>
                                    <span
                                        className="text-gray-500 text-sm flex-shrink-0">{new Date(s.date).toLocaleDateString()}</span>
                                </li>
                            )}
                        />
                    </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <div className="stats shadow bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">
                        <div className="stat">
                            <div className="stat-figure text-white"><span className="text-2xl">😊</span></div>
                            <div className="stat-title text-yellow-100 font-medium">Moods</div>
                            <div className="stat-value text-white text-2xl">{moods?.length || 0}</div>
                            <div className="stat-desc text-yellow-100">Tracked</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0">
                        <div className="stat">
                            <div className="stat-figure text-white"><span className="text-2xl">💪</span></div>
                            <div className="stat-title text-amber-100 font-medium">Habits</div>
                            <div className="stat-value text-white text-2xl">{habits?.length || 0}</div>
                            <div className="stat-desc text-amber-100">Active</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0">
                        <div className="stat">
                            <div className="stat-figure text-white"><span className="text-2xl">😴</span></div>
                            <div className="stat-title text-orange-100 font-medium">Sleep</div>
                            <div className="stat-value text-white text-2xl">{sleepRecords?.length || 0}</div>
                            <div className="stat-desc text-orange-100">Records</div>
                        </div>
                    </div>

                    <div className="stats shadow bg-gradient-to-r from-red-400 to-red-500 text-white border-0">
                        <div className="stat">
                            <div className="stat-figure text-white"><span className="text-2xl">📈</span></div>
                            <div className="stat-title text-red-100 font-medium">Consistency</div>
                            <div className="stat-value text-white text-2xl">
                                {Math.round(((moods?.length || 0) + (habits?.length || 0) + (sleepRecords?.length || 0)) / 3)}
                            </div>
                            <div className="stat-desc text-red-100">Avg. entries</div>
                        </div>
                    </div>
                </div>

                {/* Analytics Section */}
                {(moodAnalytics || habitAnalytics || sleepAnalytics) && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
                            <span className="text-3xl">📊</span>
                            Your Analytics
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Mood Analytics */}
                            {moodAnalytics && (
                                <div
                                    className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg overflow-hidden">
                                    <div className="p-6 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">😊</span>
                                            <h4 className="text-xl font-bold">Mood Insights</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div
                                                className="flex justify-between items-center p-3 bg-yellow-500/30 rounded-xl">
                                                <span className="text-yellow-100">Average Mood</span>
                                                <span
                                                    className="font-bold text-lg">{moodAnalytics.averageMood?.toFixed(1)}/10</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-yellow-500/30 rounded-xl">
                                                <span className="text-yellow-100">Highest Mood</span>
                                                <span
                                                    className="font-bold text-lg text-green-200">{moodAnalytics.highest}/10</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-yellow-500/30 rounded-xl">
                                                <span className="text-yellow-100">Lowest Mood</span>
                                                <span
                                                    className="font-bold text-lg text-red-200">{moodAnalytics.lowest}/10</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-yellow-500/30 rounded-xl">
                                                <span className="text-yellow-100">Total Entries</span>
                                                <span className="font-bold text-lg">{moodAnalytics.totalEntries}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Habit Analytics */}
                            {habitAnalytics && (
                                <div
                                    className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl shadow-lg overflow-hidden">
                                    <div className="p-6 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">💪</span>
                                            <h4 className="text-xl font-bold">Habit Insights</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div
                                                className="flex justify-between items-center p-3 bg-amber-500/30 rounded-xl">
                                                <span className="text-amber-100">Total Habits</span>
                                                <span className="font-bold text-lg">{habitAnalytics.totalHabits}</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-amber-500/30 rounded-xl">
                                                <span className="text-amber-100">Total Duration (min)</span>
                                                <span
                                                    className="font-bold text-lg">{habitAnalytics.totalDuration}</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-amber-500/30 rounded-xl">
                                                <span className="text-amber-100">Average Duration (min)</span>
                                                <span
                                                    className="font-bold text-lg">{habitAnalytics.avgDuration?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {sleepAnalytics && (
                                <div
                                    className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-lg overflow-hidden">
                                    <div className="p-6 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">😴</span>
                                            <h4 className="text-xl font-bold">Sleep Insights</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div
                                                className="flex justify-between items-center p-3 bg-orange-500/30 rounded-xl">
                                                <span className="text-orange-100">Avg. Hours</span>
                                                <span
                                                    className="font-bold text-lg">{sleepAnalytics.avgHours?.toFixed(1)}h</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-orange-500/30 rounded-xl">
                                                <span className="text-orange-100">Avg. Quality</span>
                                                <span
                                                    className="font-bold text-lg">{sleepAnalytics.avgQuality?.toFixed(1)}/10</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-orange-500/30 rounded-xl">
                                                <span className="text-orange-100">Best Sleep</span>
                                                <span
                                                    className="font-bold text-lg text-green-200">{sleepAnalytics.maxHours}h</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center p-3 bg-orange-500/30 rounded-xl">
                                                <span className="text-orange-100">Total Entries</span>
                                                <span className="font-bold text-lg">{sleepAnalytics.totalEntries}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {habitLeaderboard && habitLeaderboard.length > 0 && (
                            <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-6 shadow-lg margin mt-10">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    🏆 Habit Leaderboard
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {habitLeaderboard.map((h, i) => (
                                        <li key={i}
                                            className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{h._id}</p>
                                                <p className="text-amber-100 text-sm">
                                                    {h.entries} entries • Avg: {Math.round(h.avgDuration)} mins
                                                </p>
                                            </div>
                                            <span className="font-bold text-white text-lg">
                                                    {h.totalTime} min
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;