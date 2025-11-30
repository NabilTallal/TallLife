// components/analytics/SleepAnalyticsCard.jsx
import React from "react";

export default function SleepAnalyticsCard({ analytics }) {
    if (!analytics) return null;
    const { basic, weekly = [], bestNights = [], worstNights = [], sleepDebt = 0, consistency } = analytics;

    return (
        <div className="rounded-2xl shadow-lg p-6 bg-white">
            <h3 className="text-lg font-bold mb-4">Sleep Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex justify-between"><span>Avg Hours</span><strong>{basic.avgHours ? basic.avgHours.toFixed(2) : "—"}h</strong></div>
                    <div className="flex justify-between"><span>Avg Quality</span><strong>{basic.avgQuality ? basic.avgQuality.toFixed(2) : "—"}/10</strong></div>
                    <div className="flex justify-between"><span>Min Hours</span><strong>{basic.minHours ?? "—"}h</strong></div>
                    <div className="flex justify-between"><span>Max Hours</span><strong>{basic.maxHours ?? "—"}h</strong></div>
                </div>

                <div>
                    <div className="mb-2 font-medium">Sleep Debt (last 7d)</div>
                    <div className="text-sm text-gray-600">{sleepDebt.toFixed(2)} hours</div>
                    <div className="mt-3 font-medium">Consistency (std dev)</div>
                    <div className="text-sm text-gray-600">Std dev: {consistency.stdDev ? Number(consistency.stdDev).toFixed(2) : "—"}</div>
                </div>
            </div>

            <div className="mt-4">
                <div className="font-medium">Top nights (score = hours × quality)</div>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                    {bestNights.map(b => (
                        <li key={b._id || b.date}>
                            {new Date(b.date).toLocaleDateString()} — {b.sleepHours}h • quality {b.quality} — score {Math.round(b.score)}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <div className="font-medium">Weekly trend (avg hours)</div>
                <div className="mt-2 text-xs text-gray-600">
                    {weekly.map(w => `${w._id.year}-W${w._id.week}: ${Number(w.avgHours).toFixed(2)}h`).join(" • ")}
                </div>
            </div>
        </div>
    );
}
