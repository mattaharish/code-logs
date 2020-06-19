'use strict';

function main(subscriptionName = '<default_subscription_name>', timeout = 60) {
  const {PubSub} = require('@google-cloud/pubsub');

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  function listenForMessages() {
    // References an existing subscription
    const subscription = pubSubClient.subscription(subscriptionName);

    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = (message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(
        `\tAttributes: ${JSON.stringify(message.attributes, null, 2)}`
      );
      messageCount += 1;

      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);

    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 10000);
  }

  listenForMessages();
  // [END pubsub_subscriber_async_pull]
  // [END pubsub_quickstart_subscriber]
}

main('<subscription_name');
