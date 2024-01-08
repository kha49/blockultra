import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/ieo-ido';

export const FetchIeoIdoUpcoming = (params) => apiClient.get(baseUrl, params);
export const FetchUnlockDetail = (params) =>
  apiClient.get(`${baseUrl}/${params}`);
