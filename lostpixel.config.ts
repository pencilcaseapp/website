import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ path: '/', name: 'home' }],
    baseUrl: 'http://172.17.0.1:5173',
  },
  lostPixelProjectId: 'cmkb8aqi907x6c3jjrcm43luq',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
