import home_all_coins, { allCoinsMobileColumnsKey } from './home/all-coin';
import home_categories, { categoriesMobileColumnsKey } from './home/categories';
import home_trending, { trendingMobileColumnsKey } from './home/trending';
import home_fundraising, {
  fundraisingMobileColumnsKey,
} from './home/fundraising';
import home_upcoming, { upComingMobileColumnsKey } from './home/upcoming';
import home_gainers, { gainersMobileColumnsKey } from './home/gainers';

export const factoryColumns = {
  home_all_coins,
  home_categories,
  home_trending,
  home_fundraising,
  home_upcoming,
  home_gainers,
};

export const factoryMobileColumnsKey = {
  home_all_coins: allCoinsMobileColumnsKey,
  home_categories: categoriesMobileColumnsKey,
  home_trending: trendingMobileColumnsKey,
  home_fundraising: fundraisingMobileColumnsKey,
  home_upcoming: upComingMobileColumnsKey,
  home_gainers: gainersMobileColumnsKey,
};
export type FactoryColumns = keyof typeof factoryColumns;
