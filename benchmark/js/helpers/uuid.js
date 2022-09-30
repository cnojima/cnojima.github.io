import { gel } from './utils.js';
import { environmentKeys, initData, intentPayload } from '../stubs/data.js';

// Method to generate random UUID
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// To autofill UUID on every page refresh
export function autoFillUUID(key) {
  const srciTransactionId = uuidv4();
  const genericKey = key.replace(/SDKv[0-9].*$/i, '').trim();
  const env = environmentKeys[genericKey];

  initData.srciTransactionId = srciTransactionId;
  intentPayload.srciTransactionId = srciTransactionId;

  const bad = ['srcDpaId', 'panEncryptionId'];

  for (let k in env) {
    if (bad.indexOf(k) === -1)
      initData[k] = env[k];
  }

  // gel('initOutput').innerHTML = JSON.stringify(initData, undefined, 4);
}
