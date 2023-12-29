import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const baseUrl = 'api/coin-info/';

export const FetchFundraisings = (params) =>
  apiClient.get(baseUrl + 'fundraisings', params);

export const FetchMarkets = (params) =>
  apiClient.get(baseUrl + 'markets', params);

export const FetchOverviews = (params) =>
  apiClient.get(baseUrl + 'overviews', params);

export const FetchProfiles = (params) =>
  apiClient.get(baseUrl + 'profiles', params);

export const FetchSocials = (params) =>
  apiClient.get(baseUrl + 'socials', params);

export const FetchSumaries = (params) =>
  apiClient.get(baseUrl + 'sumaries', params);

export const FetchTokenomics = (params) =>
  apiClient.get(baseUrl + 'tokenomics', params);

export const FetchUnlocks = (params) =>
  apiClient.get(baseUrl + 'unlocks', params);

export const FetchUpComings = (params) =>
  apiClient.get(baseUrl + 'upcomings', params);

export const FetchCoinDetail = (params) =>
  apiClient.get(`${baseUrl}coin-info/detail/${params}`, params);
