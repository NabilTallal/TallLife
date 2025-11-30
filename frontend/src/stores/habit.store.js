import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useHabitStore = create((set) => ({
    habits: [],
    loading: false,
    analytics: {},
    habitLeaderboard: [],

    getAnalytics: async () => {
        try {
            const res = await axiosInstance.get("/habits/analytics");
            set({ analytics: res.data });
        } catch (error) {
            console.error("Error fetching habit analytics:", error);
        }
    },

    getHabitLeaderboard: async () => {
        try {
            set({ loading: true });
            const res = await axiosInstance.get("/habits/analytics/leaderboard");
            set({ habitLeaderboard: res.data.leaderboard });
        } catch (err) {
            console.error("Leaderboard error:", err);
        } finally {
            set({ loading: false });
        }
    },


    getHabits: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/habits");
            set({ habits: res.data });
        } catch (error) {
            console.log("Error getting habits:", error);
            toast.error("Could not load habits");
        } finally {
            set({ loading: false });
        }
    },

    addHabit: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/habits", data);
            set((state) => ({ habits: [res.data, ...state.habits] }));
            toast.success("Habit added");
        } catch (error) {
            console.log("Error adding habit:", error);
            toast.error(error?.response?.data?.message || "Error adding habit");
        } finally {
            set({ loading: false });
        }
    },

    deleteHabit: async (id) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/habits/${id}`);
            set((state) => ({
                habits: state.habits.filter((h) => h._id !== id),
            }));
            toast.success("Habit deleted");
        } catch (error) {
            console.log("Error deleting habit:", error);
            toast.error("Error deleting habit");
        } finally {
            set({ loading: false });
        }
    },

    updateHabit: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put(`/habits/${id}`, data);
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id ? res.data : h
                ),
            }));
            toast.success("Habit updated");
        } catch (error) {
            console.log("Error updating habit:", error);
            toast.error("Error updating habit");
        } finally {
            set({ loading: false });
        }
    },
}));
