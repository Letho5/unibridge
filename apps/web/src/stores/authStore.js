import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Register
      register: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/auth/register`, { email, password, name });
          set({ user: res.data.user, token: res.data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          const error = err.response?.data?.error || 'Registration failed';
          set({ error, isLoading: false });
          return { success: false, error };
        }
      },

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/auth/login`, { email, password });
          set({ user: res.data.user, token: res.data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          const error = err.response?.data?.error || 'Login failed';
          set({ error, isLoading: false });
          return { success: false, error };
        }
      },

      // Logout
      logout: async () => {
        const { token } = get();
        try {
          await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (e) {}
        set({ user: null, token: null });
      },

      // Get current user
      fetchUser: async () => {
        const { token } = get();
        if (!token) return;
        
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ user: res.data });
        } catch (err) {
          set({ user: null, token: null });
        }
      },

      // Update profile
      updateProfile: async (data) => {
        const { token } = get();
        try {
          const res = await axios.put(`${API_URL}/auth/profile`, data, {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ user: res.data });
          return { success: true };
        } catch (err) {
          return { success: false, error: err.response?.data?.error };
        }
      },

      // Sync settings to cloud
      syncSettings: async (settings) => {
        const { token } = get();
        if (!token) return;
        
        try {
          await axios.put(`${API_URL}/auth/settings`, settings, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (e) {}
      },

      // Delete account
      deleteAccount: async () => {
        const { token } = get();
        try {
          await axios.delete(`${API_URL}/auth/account`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ user: null, token: null });
          return { success: true };
        } catch (err) {
          return { success: false, error: err.response?.data?.error };
        }
      },

      isAuthenticated: () => !!get().token,
    }),
    { name: 'unibridge-auth' }
  )
);

export default useAuthStore;