import { environment } from '../../../environments/environment';

const API_BASE_URL = environment.apiBaseUrl.replace(/\/$/, '');

export const CITY_API_ENDPOINTS = {
  dashboardStatus: `${API_BASE_URL}/api/dashboard/status`,
  power: `${API_BASE_URL}/api/city/power`,
  traffic: `${API_BASE_URL}/api/city/traffic`,
  water: `${API_BASE_URL}/api/city/water`
} as const;
