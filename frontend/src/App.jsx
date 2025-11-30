import {Route, Routes, Navigate} from "react-router";
import DashBoard from "./pages/DashBoard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MoodsPage from "./pages/MoodPage.jsx"; // You'll need to create this
import HabitsPage from "./pages/HabitsPage.jsx"; // You'll need to create this
import SleepPage from "./pages/SleepPage.jsx"; // You'll need to create this
import {useEffect} from "react";
import {useAuthStore} from "./stores/auth.store.js";
import PageLoader from "./components/Loaders/PageLoader.jsx";
import {Toaster} from "react-hot-toast";

export default function App() {
    const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth) return <PageLoader/>;

    return (
        <div>
            <Routes>
                <Route
                    path="/dashboard"
                    element={authUser ? <DashBoard/> : <Navigate to="/login"/>}
                />

                <Route
                    path="/moods"
                    element={authUser ? <MoodsPage/> : <Navigate to="/login"/>}
                />

                <Route
                    path="/habits"
                    element={authUser ? <HabitsPage/> : <Navigate to="/login"/>}
                />

                <Route
                    path="/sleep"
                    element={authUser ? <SleepPage/> : <Navigate to="/login"/>}
                />

                <Route
                    path="/login"
                    element={!authUser ? <LoginPage/> : <Navigate to="/dashboard"/>}
                />

                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage/> : <Navigate to="/dashboard"/>}
                />

                <Route
                    path="*"
                    element={<Navigate to={authUser ? "/dashboard" : "/login"}/>}
                />
            </Routes>
            <Toaster/>
        </div>
    );
}