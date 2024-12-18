import axios from 'axios';
import { LoginCredentials } from '@/modules/auth/authSlice.ts';

const AUTH_BASE_URL = `${import.meta.env.VITE_AGENT_API_URL}/agent-api/v1/rest/auth`;

interface LoginResponse {
  data: {
    token: string;
  };
}

const AuthService = {
  loginAxios: axios.create(),

  authenticatedAxios: axios.create(),

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.loginAxios.post(
        `${AUTH_BASE_URL}/login`,
        { data: credentials },
        {
          headers: {
            accept: 'application/vnd.flex-ev.user+json;version=1',
            'Content-Type':
              'application/vnd.flex-ev.login-request+json;version=1',
          },
        }
      );

      this.setToken(response.data.data.token);

      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  // Token Management
  setToken(token: string) {
    localStorage.setItem('authToken', token);

    this.authenticatedAxios.defaults.headers.common['Authorization'] =
      `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
    delete this.authenticatedAxios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
  },

  setupAxiosInterceptors() {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }

    const excludedUrls = [`${AUTH_BASE_URL}/login`];

    // Request Interceptor for all axios instances
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestInterceptor = (config: any) => {
      const isExcluded = excludedUrls.some((url) => config.url?.includes(url));

      if (!isExcluded) {
        const token = this.getToken();

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorHandler = (error: any) => {
      return Promise.reject(error);
    };

    // Apply interceptors to both axios instances
    this.authenticatedAxios.interceptors.request.use(
      requestInterceptor,
      errorHandler
    );
    axios.interceptors.request.use(requestInterceptor, errorHandler);

    // Response Interceptor
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseInterceptor = (response: any) => response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseErrorHandler = (error: any) => {
      const isExcluded = excludedUrls.some((url) =>
        error.config.url?.includes(url)
      );

      if (
        !isExcluded &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        this.removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    };

    this.authenticatedAxios.interceptors.response.use(
      responseInterceptor,
      responseErrorHandler
    );
    axios.interceptors.response.use(responseInterceptor, responseErrorHandler);
  },

  // Initialize method to be called on app startup
  initialize() {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }
    this.setupAxiosInterceptors();
  },

  // Logout method
  logout() {
    this.removeToken();
    window.location.href = '/login';
  },
};

export const authenticatedAxios = AuthService.authenticatedAxios;
export default AuthService;
