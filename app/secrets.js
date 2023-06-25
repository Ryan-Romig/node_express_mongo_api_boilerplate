require('dotenv-expand').expand(require('dotenv').config())

const secrets = {
  dbUri: process.env.DB_URI || '',
  port: process.env.PORT || 3000

};
const secretNames = {
  dbUri:'dbUri',
  port:'port',
}

const getSecret = (key) => secrets[key];

module.exports = { getSecret, secretNames };
