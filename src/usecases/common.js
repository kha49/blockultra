import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/common/';

export const GlobalSearchCoins = (params) =>
  apiClient.get(baseUrl + 'global-search-coin', params);

export const FetchHeaderBar = () =>
  apiClient.get(baseUrl + 'header-bar-runing', params);
