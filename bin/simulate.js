const createClient = require('@rabblerouser/stream-client');

const streamClient = createClient({
  publishToStream: process.env.STREAM_NAME,
  kinesisEndpoint: process.env.KINESIS_ENDPOINT,
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'FAKE',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE',
});

const event = {
  from: 'RABBLE',
  to: '+61491570156',
  message: 'Get rousing.',
};

streamClient.publish('send-sms', event)
  .then(data => console.log('send-sms event successfully published:', data))
  .catch(error => {
    console.log('send-sms event publishing failed:', error)
    process.exit(1);
  });
