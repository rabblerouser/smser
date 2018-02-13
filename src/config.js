module.exports = {
  snsRegion: process.env.SNS_REGION || 'ap-southeast-2',
  snsEndpoint: process.env.SNS_ENDPOINT,
  kinesisRegion: process.env.KINESIS_REGION || 'ap-southeast-2',
  kinesisEndpoint: process.env.KINESIS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'FAKE',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE',
  streamName: process.env.STREAM_NAME,
  listenerAuthToken: process.env.LISTENER_AUTH_TOKEN || 'secret',
};
