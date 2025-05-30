/** @type {import('@storybook/test-runner').TestRunnerConfig} */
module.exports = {
  browser: 'chromium',
  launchOptions: {
    headless: true,
    args: ['--window-size=1920,1080'],
  },
  async preVisit(page) {
    console.debug('preVisit #########################');
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'language', {
        get: () => 'en-US',
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });

      // Emulacja strefy czasowej
      const originalDateTimeFormat = Intl.DateTimeFormat;
      Intl.DateTimeFormat = function (locale, options = {}) {
        return new originalDateTimeFormat('en-US', {
          timeZone: 'UTC',
          ...options,
        });
      };
    });
  },
};
