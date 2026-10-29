const { test, expect } = require('../fixtures/fixtures');

// Login specs must start logged out, regardless of the project's storageState.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid credentials land on admin home @smoke', async ({ loginPage, adminHomePage, config, page }) => {
    await loginPage.login(config.credentials.username, config.credentials.password);

    await expect(page).toHaveURL(adminHomePage.urlPattern);
    await expect(adminHomePage.pageTitle).toContainText('Welcome back');
    await expect(adminHomePage.userMenu).toBeVisible();
  });

  test('invalid password shows an error', async ({ loginPage, config, page }) => {
    await loginPage.login(config.credentials.username, 'definitely-wrong-password');

    await expect(loginPage.errorAlert).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
