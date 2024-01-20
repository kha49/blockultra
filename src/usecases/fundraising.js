import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();
const prefix = 'api/';
// {{domain}}:{{port}}/api/top-backers?sort_by&sort_order&limit&page&search_key
// {{domain}}:{{port}}/api/funding-rounds?sort_by&sort_order&limit&page&search_key
// {{domain}}:{{port}}/api/top-backers?sort_by&sort_order&limit&page&search_key
// {{domain}}:{{port}}/api/top-backers?sort_by&sort_order&limit&page&search_key
// {{domain}}:{{port}}/api/fundraisings/backer?backer_id=124
// {{domain}}:{{port}}/api/fundraisings/search
export const FetchFundraising = (path, params) =>
  apiClient.get(`${prefix + path}`, params);

export const FetchTopBacker = (params) => apiClient.get(topbackerUrl, params);

export const FetchUnlockDetail = (params) =>
  apiClient.get(`${prefix}/${params}`);
