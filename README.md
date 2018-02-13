# Rabble Rouser SMSer

[![Build Status](https://travis-ci.org/rabblerouser/smser.svg?branch=master)](https://travis-ci.org/rabblerouser/smser)


This service sends SMS messages using SNS, in response to `send-sms` events from the main stream.

## Setup

1. Install Docker:
  - [for Mac](https://docs.docker.com/docker-for-mac/)
  - [for Windows](https://docs.docker.com/docker-for-windows/)
  - [for Linux](https://docs.docker.com/engine/installation/linux/)

2. Start a Docker container to develop in (this also starts containers for dependent services):

        `bin/dev-environment` # For Mac/Linux
        # Windows not supported yet :(

---

* To simulate a `send-sms` event (this will not trigger a real SMS to be sent -
  everything is local only):

1. Run the application locally:

        `bin/local`

2. Open up a second terminal, and run:

        `bin/simulate`

3. Verify that the output shows the SMS was 'sent' correctly.
