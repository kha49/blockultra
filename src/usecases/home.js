import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/home/';

export const FetchCoins = (params) => {
  return apiClient.get(baseUrl + 'coins', params);
};

export const SearchCoinsFilter = (params) =>
  apiClient.get(baseUrl + 'coins/search', params);

export const SearchCategoriesFilter = (params) =>
  apiClient.get(baseUrl + 'categories/search', params);

export const FetchCategories = (params) =>
  apiClient.get(baseUrl + 'categories', params);

export const FetchTrendings = (params) =>
  apiClient.post(baseUrl + 'trendings', params);

export const FetchUpComings = (params) =>
  apiClient.post(baseUrl + 'upcomings', params);

export const FetchFundraisings = (params) =>
  apiClient.post(baseUrl + 'fundraisings', params);

export const FetchGainers = (params) =>
  apiClient.post(baseUrl + 'gainers', params);

export const FetchLosers = (params) =>
  apiClient.post(baseUrl + 'losers', params);
