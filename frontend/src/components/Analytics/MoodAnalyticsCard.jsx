// components/analytics/MoodAnalyticsCard.jsx
import React from "react";

export default function MoodAnalyticsCard({ analytics }) {
    if (!analytics) return null;
    const { basic, distribution = [], trend = [], heatmap = [], correlation = [] } = analytics;

    return (
        <div className="rounded-2xl shadow-lg p-6 bg-white">
            <h3 className="text-lg font-bold mb-4">Mood Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Average Mood</span>
                        <strong>{basic.averageMood ? basic.averageMood.toFixed(2) : "—"}/10</strong>
                    </div>
                    <div className="flex justify-between">
                        <span>Highest</span>
                        <strong>{basic.highest ?? "—"}</strong>
                    </div>
                    <div className="flex justify-between">
                        <span>Lowest</span>
                        <strong>{basic.lowest ?? "—"}</strong>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Entries</span>
                        <strong>{basic.totalEntries ?? 0}</strong>
                    </div>
                </div>

                <div>
                    <div className="mb-2 font-medium">Distribution (score → count)</div>
                    <div className="flex flex-wrap gap-2">
                        {Array.from({length:10}, (_,i)=>i+1).map((n) => {
                            const found = distribution.find(d => d._id === n);
                            return (
                                <div key={n} className="px-3 py-1 bg-yellow-50 rounded-full text-sm">
                                    {n}: {found ? found.count : 0}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Trend preview */}
            <div className="mt-4">
                <div className="text-sm text-gray-500">Recent trend (avg mood per day)</div>
                <div className="mt-2 text-xs text-gray-600">
                    {trend.slice(-7).map(t => `${t._id}: ${Number(t.avgMood).toFixed(1)}`).join(" • ")}
                </div>
            </div>

            {/* Correlation preview */}
            <div className="mt-4">
                <div className="text-sm text-gray-500">Mood vs Sleep (>=7h vs &lt;7h)</div>
                <div className="mt-2 text-xs text-gray-600">
                    {correlation.map(c => `${c._id.sleepBucket}: avgMood ${Number(c.avgMood).toFixed(2)} (${c.entries} entries)`).join(" • ")}
                </div>
            </div>
        </div>
    );
}
