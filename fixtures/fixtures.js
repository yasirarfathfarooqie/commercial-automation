const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AdminHomePage } = require('../pages/AdminHomePage');
const config = require('../config/env');

exports.test = base.test.extend({
  config: async ({}, use) => use(config),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  adminHomePage: async ({ page }, use) => use(new AdminHomePage(page)),
});

exports.expect = base.expect;
