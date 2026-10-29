const { BasePage } = require('./BasePage');

class AdminHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.urlPattern = /\/admin\/home/;
    this.userMenu = page.getByRole('button', { name: 'User menu' });
    this.applicantSearch = page.getByLabel('Global Applicant Search');
  }

  async open() {
    await super.open('/admin/home');
  }
}

module.exports = { AdminHomePage };
