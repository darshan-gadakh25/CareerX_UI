import axios from 'axios';

const API_BASE_URL = 'http://localhost:5086/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/users', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Student Profile APIs
export const profileAPI = {
  getProfile: () => api.get('/StudentProfile'),
  getProfileById: (studentId) => api.get(`/StudentProfile/${studentId}`),
  createProfile: (profileData) => api.post('/StudentProfile', profileData),
  updateProfile: (profileData) => api.put('/StudentProfile', profileData),
  deleteProfile: () => api.delete('/StudentProfile'),
  uploadProfilePicture: (formData) => api.post('/student/profile/picture', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Assessment APIs
export const assessmentAPI = {
  saveAssessment: (assessmentData) => api.post('/assessments', assessmentData),
  getAssessments: () => api.get('/assessments'),
  getAssessmentResults: (assessmentId) => api.get(`/assessments/${assessmentId}/results`),
  sendAssessmentEmail: (assessmentId) => api.post(`/assessments/${assessmentId}/send-email`),
};

// Payment APIs
export const paymentAPI = {
  createPaymentIntent: (amount) => api.post('/payments/create-intent', { amount }),
  verifyPayment: (paymentData) => api.post('/payments/verify', paymentData),
  getPaymentHistory: () => api.get('/payments/history'),
};

// Career APIs
export const careerAPI = {
  getCareers: () => api.get('/careers'),
  getCareerDetails: (careerId) => api.get(`/careers/${careerId}`),
  getAICareerRecommendations: () => api.get('/careers/ai-recommendations'),
};

// Subscription APIs
export const subscriptionAPI = {
  checkSubscription: () => api.get('/subscription/status'),
  activateSubscription: (paymentId) => api.post('/subscription/activate', { paymentId }),
};

export default api;