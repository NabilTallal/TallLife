import React from "react";
import MoodForm from "../components/Forms/MoodForm.jsx";
import Sidebar from "../components/other/Sidebar.jsx";
import Header from "../components/other/Header.jsx";

export default function MoodPage() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-yellow-500 via-white to-amber-400">
            <Sidebar />
            <main className="flex-1 p-8">
                <Header title="Track Your Mood" />
                <div className="max-w-4xl mx-auto">
                    <MoodForm />
                </div>
            </main>
        </div>
    );
}