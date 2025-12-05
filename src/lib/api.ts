// Yahmi API Client - Frontend
// In production on Vercel, API is served from same domain under /api
// In development, connect to local Express server
const API_BASE = import.meta.env.PROD 
  ? '' // Production: same domain, routes start with /api
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001'); // Development: local server

class APIClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage
    this.token = localStorage.getItem('yahmi_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('yahmi_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('yahmi_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: any = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          error: `Request failed with status ${response.status}` 
        }));
        throw new Error(error.error || `Request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      // Handle network errors
      if (error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check if the server is running.');
      }
      throw error;
    }
  }

  // Auth
  async signUp(email: string, password: string, additionalData?: any) {
    const result = await this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, ...additionalData }),
    });
    this.setToken(result.token);
    return result;
  }

  async signIn(email: string, password: string) {
    const result = await this.request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(result.token);
    return result;
  }

  async signOut() {
    await this.request('/api/auth/signout', { method: 'POST' });
    this.clearToken();
  }

  async getMe() {
    return this.request('/api/auth/me');
  }

  // Profile
  async getProfile() {
    return this.request('/api/profile');
  }

  async updateProfile(data: any) {
    return this.request('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Assessment
  async generateAssessment(params: { industry: string; companySize?: string; company?: any }) {
    return this.request('/api/assessment/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async submitAssessment(data: { industry: string; responses: any; carbonScore: number; esgScore: number }) {
    return this.request('/api/assessment/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAssessments() {
    return this.request('/api/assessments');
  }

  // Report
  async generateReport(data: { assessmentId: string; responses: any }) {
    return this.request('/api/report/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReports() {
    return this.request('/api/reports');
  }

  async getLatestReport() {
    return this.request('/api/reports/latest');
  }

  // Analytics
  async generateDeepAnalytics(data: { reportId?: string; company: any; latestReport: any; responses: any }) {
    return this.request('/api/analytics/deep', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLatestAnalytics() {
    return this.request('/api/analytics/latest');
  }

  // Dashboard
  async getDashboard() {
    return this.request('/api/dashboard');
  }
}

export const api = new APIClient();
