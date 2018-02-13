const logger = require('./logger');
const sns = require('./sns');
const streamClient = require('./streamClient');

const publishSMSEvent = (eventType, to, from, message) => {
  streamClient.publish(eventType, { to, from, message })
    .catch(() => {
      logger.error(`Failed to publish ${eventType} event: { to: ${to}, from: ${from}, message: ${message} }`);
    });
};

const sendSMS = ({ to, message, from }) => {
  const messageParams = {
    Message: message,
    MessageStructure: 'text',
    PhoneNumber: to,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        DataType: 'String',
        StringValue: from,
      },
    },
  };

  return sns.publish(messageParams).promise()
    .then((data) => {
      logger.info(`Sent SMS to ${to}`);
      publishSMSEvent('sms-sent', to, from, message);
      return Promise.resolve(data);
    })
    .catch((err) => {
      logger.error(`Failed to send SMS to ${to} with error ${err}`);
      publishSMSEvent('sms-failed', to, from, message);
      return Promise.reject(err);
    });
};

module.exports = sendSMS;
