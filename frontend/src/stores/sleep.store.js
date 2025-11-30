import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useSleepStore = create((set) => ({
    sleepRecords: [],
    loading: false,
    analytics: {},

    getAnalytics: async () => {
        try {
            const res = await axiosInstance.get("/sleep/analytics");
            set({ analytics: res.data });
        } catch (error) {
            console.error("Error fetching sleep analytics:", error);
        }
    },

    getSleeps: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/sleep");
            set({ sleepRecords: res.data });
        } catch (error) {
            console.log("Error getting sleep records:", error);
            toast.error("Could not load sleep data");
        } finally {
            set({ loading: false });
        }
    },

    addSleep: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/sleep", data);
            set((state) => ({ sleepRecords: [res.data, ...state.sleepRecords] }));
            toast.success("Sleep record added");
        } catch (error) {
            console.log("Error adding sleep:", error);
            toast.error(error?.response?.data?.message || "Error adding sleep");
        } finally {
            set({ loading: false });
        }
    },

    deleteSleep: async (id) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/sleep/${id}`);
            set((state) => ({
                sleepRecords: state.sleepRecords.filter((s) => s._id !== id),
            }));
            toast.success("Sleep record deleted");
        } catch (error) {
            console.log("Error deleting sleep:", error);
            toast.error("Error deleting sleep");
        } finally {
            set({ loading: false });
        }
    },

    updateSleep: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put(`/sleep/${id}`, data);
            set((state) => ({
                sleepRecords: state.sleepRecords.map((s) =>
                    s._id === id ? res.data : s
                ),
            }));
            toast.success("Sleep updated");
        } catch (error) {
            console.log("Error updating sleep:", error);
            toast.error("Error updating sleep");
        } finally {
            set({ loading: false });
        }
    },
}));
