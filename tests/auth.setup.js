const { test: setup, expect } = require('../fixtures/fixtures');

// Logs in once and saves the session so other specs start already authenticated.
setup('authenticate', async ({ loginPage, adminHomePage, config, page }) => {
  await loginPage.open();
  await loginPage.login(config.credentials.username, config.credentials.password);
  await expect(page).toHaveURL(adminHomePage.urlPattern);
  await page.context().storageState({ path: config.storageState });
});
