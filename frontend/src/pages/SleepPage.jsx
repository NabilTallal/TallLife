import React from "react";
import SleepForm from "../components/Forms/SleepForm.jsx";
import Sidebar from "../components/other/Sidebar.jsx";
import Header from "../components/other/Header.jsx";

export default function SleepPage() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-yellow-500 via-white to-amber-400">
            <Sidebar />
            <main className="flex-1 p-8">
                <Header title="Track Your Sleep" />
                <div className="max-w-4xl mx-auto">
                    <SleepForm />
                </div>
            </main>
        </div>
    );
}