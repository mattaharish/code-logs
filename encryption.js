const crypto = require('crypto');

const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgsa+W8guYTn+MMBWEIwTws/ocEYTWF/NkTp3wEoLPHPEJvR/p3/7POfXruMdRF5ZZyL070FKvWFpDQ1V/XwkvOw8dv3epAduZ3Ik/7YqwqK0CRckGQfVYem/2oGgDjhwFzWxlPonRCVlDAhW1hTQ3q0STaCxEN4PT5SlvWUGRd2KyiHWYRrenLQzso4438LNLeW5h7WpZTOJOn0033YC10zDfwwFCzGrN04n677AJ2f4CIun9Gw+t0bDD8ZiZAoPpwvhYa8D7lyt+7T6CdfOZGUfP05F0/b32KEBmcVjQx49jMEqDmyBFnd6NgRSkxVD7zM3z8RPY0K9oVCHIPHauwIDAQAB\n-----END PUBLIC KEY-----';

// This is the data we want to encrypt
const data = 'my secret data';

const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(data)
);

console.log('encrypted data: ', encryptedData.toString('base64'));
