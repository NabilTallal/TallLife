// components/StatCard.jsx
import React from "react";

const StatCard = ({ title, colorClass, data = [], emptyText, renderItem }) => {
    return (
        <div className={`p-6 rounded-2xl ${colorClass.bg}/50 shadow-lg backdrop-blur-md`}>
            <h3 className={`text-xl font-semibold mb-4 ${colorClass.text}`}>{title}</h3>
            {data.length === 0 ? (
                <p className={`${colorClass.textLight}`}>{emptyText}</p>
            ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {data.map(renderItem)}
                </ul>
            )}
        </div>
    );
};

export default StatCard;
