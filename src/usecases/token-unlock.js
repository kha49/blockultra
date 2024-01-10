import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/token-unlocks';

export const FetchTokenUnlock = (params) => apiClient.get(baseUrl, params);
export const FetchUnlockDetail = (params) =>
  apiClient.get(`${baseUrl}/${params}`);
