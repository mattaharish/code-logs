const crypto = require('crypto');

const publicKey =
  '-----BEGIN PUBLIC KEY-----\n<PASTE_PUBLIC_KEY_HERE>\n-----END PUBLIC KEY-----';

// This is the data we want to encrypt
const data = 'Password@123';

const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(data)
);

console.log('encrypted data: ', encryptedData.toString('base64'));
