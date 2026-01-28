/**
 * ApiClient - HTTP client for UniBridge backend
 */
import axios from 'axios';

export class ApiClient {
  constructor(options = {}) {
    this.baseURL = options.baseURL || '/api';

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: options.timeout || 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.accessToken = null;
    this.refreshToken = null;
    this.onAuthError = null;

    this.setupInterceptors();
    this.loadTokens();
  }

  setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && this.refreshToken) {
          try {
            await this.refreshAccessToken();
            error.config.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.client(error.config);
          } catch {
            this.clearTokens();
            if (this.onAuthError) this.onAuthError();
          }
        }
        return Promise.reject(this.formatError(error));
      }
    );
  }

  formatError(error) {
    if (error.response) {
      return {
        code: error.response.data?.error?.code || 'API_ERROR',
        message: error.response.data?.error?.message || 'An error occurred',
        status: error.response.status,
      };
    }
    return { code: 'NETWORK_ERROR', message: 'Network error', status: 0 };
  }

  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('unibridge-access-token', accessToken);
    localStorage.setItem('unibridge-refresh-token', refreshToken);
  }

  loadTokens() {
    this.accessToken = localStorage.getItem('unibridge-access-token');
    this.refreshToken = localStorage.getItem('unibridge-refresh-token');
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('unibridge-access-token');
    localStorage.removeItem('unibridge-refresh-token');
  }

  async refreshAccessToken() {
    const response = await this.client.post('/auth/refresh', {
      refreshToken: this.refreshToken,
    });
    this.setTokens(response.data.accessToken, response.data.refreshToken);
  }

  // Auth
  async register(data) {
    const response = await this.client.post('/auth/register', data);
    this.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async login(data) {
    const response = await this.client.post('/auth/login', data);
    this.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async getMe() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // User
  async getPreferences() {
    const response = await this.client.get('/user/preferences');
    return response.data;
  }

  async updatePreferences(data) {
    const response = await this.client.put('/user/preferences', data);
    return response.data;
  }

  // Translations
  async saveTranslation(data) {
    const response = await this.client.post('/translations', data);
    return response.data;
  }

  async getTranslations(params) {
    const response = await this.client.get('/translations', { params });
    return response.data;
  }

  // Learning
  async getLessons() {
    const response = await this.client.get('/learning/lessons');
    return response.data;
  }

  async getProgress() {
    const response = await this.client.get('/learning/progress');
    return response.data;
  }

  async updateProgress(data) {
    const response = await this.client.post('/learning/progress', data);
    return response.data;
  }
}