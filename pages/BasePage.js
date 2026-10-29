class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('#page-title');
  }

  async open(path = '/') {
    await this.page.goto(path);
  }
}

module.exports = { BasePage };
