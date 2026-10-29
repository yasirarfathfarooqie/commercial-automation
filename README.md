# CommunityForce Playwright Automation

Playwright + JavaScript, Page Object Model.

```
config/env.js        loads .env.<ENV>, validates BASE_URL / APP_USERNAME / APP_PASSWORD
pages/               page objects (BasePage, LoginPage, AdminHomePage)
fixtures/fixtures.js injects page objects + config into tests
tests/auth.setup.js  logs in once, saves session to .auth/<env>-user.json
tests/*.spec.js      specs
Jenkinsfile          CI pipeline (ENV / SUITE parameters)
```

## Local setup

```bash
npm ci
npx playwright install chromium
cp .env.example .env.stag   # fill in BASE_URL, APP_USERNAME, APP_PASSWORD
```

Run:

```bash
npm run test:stag      # or test:dev
npm run test:prod      # smoke tests only
npm run test:headed
npm run report
```

`ENV` defaults to `stag`. Real environment variables override the `.env.<ENV>` file, which is how Jenkins injects credentials.

## Jenkins

1. Add three **Username with password** credentials: `cf-dev-creds`, `cf-stag-creds`, `cf-prod-creds`.
2. Set the real URLs in `BASE_URLS` at the top of the `Jenkinsfile`.
3. Create a Pipeline job from SCM pointing at this repo. Choose `ENV` / `SUITE` with **Build with Parameters**.

JUnit results appear on the build page. The HTML report and traces are archived as artifacts.

`.env.*` files are git-ignored. Never commit credentials.
