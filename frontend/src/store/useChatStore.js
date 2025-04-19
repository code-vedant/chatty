import { create } from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    currentUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data.user });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (message) => {
        
        const {currentUser,messages} = get();
        
        try {
            const res = await axiosInstance.post(`/messages/send/${currentUser._id}`, message);
            set({ messages: [...messages, res.data.newMessage] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setCurrentUser: (selectedUser) => {
        set({ currentUser : selectedUser});
    },

    subscribeToMessages: () => {
        const {currentUser} = get()

        if (!currentUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (message) => {
            set({
                messages: [...get().messages, message],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        if (!socket) return;

        socket.off("newMessage");
    },
}))