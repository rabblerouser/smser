const sendSMS = require('../sendSMS');
const streamClient = require('../streamClient');
const sns = require('../sns');

describe('sendSMS', () => {
  let sandbox;
  const smsEvent = {
    from: 'ROUSER',
    to: '+61491570156', // Fake phone number that will not be connected, just in case
    message: 'Important notice from Rabble Rouser',
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(sns, 'publish').callsFake(() => ({
      promise() {
        return Promise.resolve();
      },
    }));
    sandbox.stub(streamClient, 'publish').resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when an SMS event is received', () => {
    it('sends an SMS', () => sendSMS(smsEvent).then(() => {
      expect(sns.publish).to.have.been.calledWith({
        Message: 'Important notice from Rabble Rouser',
        MessageStructure: 'text',
        PhoneNumber: '+61491570156',
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: 'ROUSER',
          },
        },
      });
    }));

    it('publishes an event for a successful SMS', () => sendSMS(smsEvent).then(() => {
      expect(streamClient.publish).to.have.been.calledWith('sms-sent', {
        to: '+61491570156',
        message: 'Important notice from Rabble Rouser',
      });
      expect(streamClient.publish.callCount).to.eql(1);
    }));
  });
});
