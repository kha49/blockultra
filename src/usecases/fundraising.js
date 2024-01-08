import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const topbackerUrl = 'api/top-backers';

export const FetchTopBacker = (params) => apiClient.get(topbackerUrl, params);
export const FetchUnlockDetail = (params) =>
  apiClient.get(`${baseUrl}/${params}`);
