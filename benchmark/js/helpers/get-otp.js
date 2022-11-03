import { benchmarkState } from '../stubs/data.js';
import { fetchReq } from './fetch.js';
import { extractHostname } from './utils.js';


export const canGetOtp = sdkUrl => (sdkUrl.indexOf('vbox') > -1);


export async function getOTP() {
  console.info('attempting to retrieve OTP code via API');

  let token;
  const proxy = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/proxy`;
  const url = 'https://vbox671.secure.checkout.visa.com/srcsdktester/generateOtp';

  const environment = extractHostname(benchmarkState.sdkUrl);
  // console.log("Environment:", environment);

  // Get email
  var email = localStorage.getItem('email');
  // console.log("Email for OTP:", email);
  
  // Make indirect call to get OTP
  const options = {
    method: 'GET',
    url: `${proxy}?url=${url}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'envn': environment,
      'email': email,
    }
  };

  const result = await fetchReq(options).catch(err => {
    console.error('getOTP error:', err);
  });

  // console.log("Final get OTP Result - " + JSON.stringify(result));

  if (result.data) {
    token = result.data.otpValue;
  } else {
    console.warn(`could not autoget OTP code from [${url}]`);
  }

  return token;
}
