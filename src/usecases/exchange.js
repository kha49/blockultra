import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/exchanges';

export const FetchList = (params) => apiClient.get(baseUrl, params);
