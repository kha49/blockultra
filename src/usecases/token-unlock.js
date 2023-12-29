import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/token-unlocks';

export const FetchList = (params) => apiClient.get(baseUrl, params);
