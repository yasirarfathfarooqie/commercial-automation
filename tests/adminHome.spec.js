const { test, expect } = require('../fixtures/fixtures');

// Runs with the session saved by auth.setup.js.
test.describe('Admin home', () => {
  test('authenticated user can open admin home @smoke', async ({ adminHomePage, page }) => {
    await adminHomePage.open();

    await expect(page).toHaveURL(adminHomePage.urlPattern);
    await expect(adminHomePage.pageTitle).toContainText('Welcome back');
    await expect(adminHomePage.applicantSearch).toBeVisible();
  });
});
