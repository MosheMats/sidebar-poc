import { NAVIGATE_TO } from './types';

export const navigateToAction = (url: string) => ({
  type: NAVIGATE_TO,
  url
});