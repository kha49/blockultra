import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/home/';

export const FetchCoins = (params) => {
  return apiClient.get(baseUrl + 'coins', params);
};

export const SearchCoinsFilter = (params) =>
  apiClient.get(baseUrl + `coins/search`, params);

export const SearchCategoriesFilter = (params) =>
  apiClient.get(baseUrl + 'categories/search', params);

export const FetchCategories = (params) =>
  apiClient.get(baseUrl + 'categories', params);

export const FetchTrendings = (params) =>
  apiClient.get(baseUrl + 'trendings', params);

export const FetchUpComings = (params) =>
  apiClient.get(baseUrl + 'upcomings', params);

export const FetchFundraisings = (params) =>
  apiClient.get(baseUrl + 'fundraisings', params);

export const FetchGainers = (params) =>
  apiClient.get(baseUrl + 'gainers', params);

export const FetchLosers = (params) =>
  apiClient.get(baseUrl + 'losers', params);
