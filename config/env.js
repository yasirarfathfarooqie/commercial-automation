const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const ENV = (process.env.ENV || 'stag').toLowerCase();
const SUPPORTED = ['dev', 'stag', 'prod'];

if (!SUPPORTED.includes(ENV)) {
  throw new Error(`Unknown ENV "${ENV}". Use one of: ${SUPPORTED.join(', ')}`);
}

// Values already in process.env (e.g. injected by Jenkins) win over the .env file.
const envFile = path.resolve(__dirname, '..', `.env.${ENV}`);
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile, quiet: true });
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} for ENV="${ENV}". Set it in .env.${ENV} or as an environment variable.`);
  }
  return value;
}

module.exports = {
  env: ENV,
  storageState: path.resolve(__dirname, '..', '.auth', `${ENV}-user.json`),
  baseURL: required('BASE_URL'),
  credentials: {
    username: required('APP_USERNAME'),
    password: required('APP_PASSWORD'),
  },
};
