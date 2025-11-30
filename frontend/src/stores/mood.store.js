import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useMoodStore = create((set) => ({
    moods: [],
    loading: false,
    analytics: {},

    getAnalytics: async () => {
        try {
            const res = await axiosInstance.get("/moods/analytics");
            set({ analytics: res.data });
        } catch (error) {
            console.error("Error fetching mood analytics:", error);
        }
    },

    getMoods: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/moods");
            set({ moods: res.data });
        } catch (error) {
            console.log("Error getting moods:", error);
            toast.error("Could not load moods");
        } finally {
            set({ loading: false });
        }
    },

    addMood: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/moods/", data);
            set((state) => ({ moods: [res.data, ...state.moods] }));
            toast.success("Mood added");
        } catch (error) {
            console.log("Error adding mood:", error);
            toast.error(error?.response?.data?.message || "Error adding mood");
        } finally {
            set({ loading: false });
        }
    },

    deleteMood: async (id) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/moods/${id}`);
            set((state) => ({
                moods: state.moods.filter((m) => m._id !== id),
            }));
            toast.success("Mood deleted");
        } catch (error) {
            console.log("Error deleting mood:", error);
            toast.error("Error deleting mood");
        } finally {
            set({ loading: false });
        }
    },

    updateMood: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put(`/moods/${id}`, data);
            set((state) => ({
                moods: state.moods.map((m) =>
                    m._id === id ? res.data : m
                ),
            }));
            toast.success("Mood updated");
        } catch (error) {
            console.log("Error updating mood:", error);
            toast.error("Error updating mood");
        } finally {
            set({ loading: false });
        }
    },
}));
