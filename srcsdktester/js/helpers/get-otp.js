import { fetchReq } from './fetch.js';
import { extractHostname } from './utils.js';

export async function getOTP() {
  console.info('attempting to retrieve OTP code via API');
  let token;
  let url = 'https://vbox671.secure.checkout.visa.com/srcsdktester/generateOtp';
  let environment = extractHostname(url);
  
  // Get email
  var email = localStorage.getItem('email');
  console.log("Email for OTP:", email);

  // Get environment
  // var VisaSdkPath = localStorage.getItem('srciDomain');
  // if (VisaSdkPath) {
  //   environment = extractHostname(VisaSdkPath);
  // }
  console.log("Environment:", environment);
  
  // Make indirect call to get OTP
  const options = {
    method: 'GET',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'envn': environment,
      'email': email,
    }
  };
  let result = await fetchReq(options).catch(err => {
    console.error('getOTP error:', err);
  });

  console.log("Final get OTP Result - " + JSON.stringify(result));

  if (result.data) {
    token = result.data.otpValue;
    var inputText = document.getElementById('completeIdValidationInput').value;
    inputText = JSON.parse(inputText);
    inputText.validationData = token;
    document.getElementById('completeIdValidationInput').value = JSON.stringify(inputText, undefined, 4);
  } else {
    console.warn(`could not autoget OTP code from [${url}]`);
  }

  return token;
}
