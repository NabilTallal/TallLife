import React from "react";
import HabitForm from "../components/Forms/HabitForm.jsx";
import Sidebar from "../components/other/Sidebar.jsx";
import Header from "../components/other/Header.jsx";

export default function HabitsPage() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-yellow-500 via-white to-amber-400">
            <Sidebar />
            <main className="flex-1 p-8">
                <Header title="Build Healthy Habits" />
                <div className="max-w-4xl mx-auto">
                    <HabitForm />
                </div>
            </main>
        </div>
    );
}