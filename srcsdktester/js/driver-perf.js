import { loadSdk } from './async/load-sdk.js';
import { setPointers, emailSetter } from './helpers/email.js';
import { buildSdkPicker } from './helpers/generate-sdk-list.js';
import { getOTP } from './helpers/get-otp.js';
import { catchErr, extractHostname, serializeObject } from './helpers/utils.js';
import { initData, userInfo, intentPayload } from './stubs/data.js';

let authToken;
let srcCorrelationId;
let srcProfiles;
let srciTransactionId;

const gel = id => document.getElementById(id);
const lsEmail = localStorage.getItem('email');
if (lsEmail) {
  const em = gel('emailInput');
  const ev = new Event('blur');
  em.value = lsEmail;
  em.dispatchEvent(ev);
}

buildSdkPicker();
