const AWS = require('aws-sdk');
const config = require('./config');

module.exports = new AWS.SNS({
  endpoint: config.snsEndpoint,
  region: config.snsRegion,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
