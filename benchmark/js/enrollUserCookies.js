import idLookupJsonData from '../json/identityLookup.js';
import genAccessJsonData from '../json/generateAccessToken.js';
import genOtpJsonData from '../json/generateOTP.js';
import lostPasswordJsonData from '../json/lostPassword.js';
import verifyOtpJsonData from '../json/verifyOTP.js';
import spawnCallJsonData from '../json/spawnCall.js';
import spawnCallSSIEnrollJsonData from '../json/spawnCallSSIEnroll.js';
import {
  fetchReq
} from './helpers/fetch.js';
import merchantApiKeys from './helpers/merchantApiKeys.js';
const SIX_MONTHS_IN_MS = (52 / 2) * 7 * 24 * 60 * 60 * 1000;
var host = window.location.host;
host = host.match('.*(?=.secure|Secure)');
console.log("Envn Name got from host URL - " + host);
var apiKey;

$(function () {
  var enrollERMButton = document.querySelector('#enrollSSIBtn');
  if (enrollERMButton) {
    enrollERMButton.addEventListener("click", async function () {
      let availableMerchantApiKeys = Object.keys(merchantApiKeys);
      if ((JSON.stringify(availableMerchantApiKeys)).includes(host)) {
        // apiKey = merchantApiKeys[host];
        apiKey = merchantApiKeys['vbox671'];
      } else {
        console.log("######### Merchanty API Key is not available. ##########");
        console.log("Available Configs: " + availableMerchantApiKeys);
        return 'Merchanty API Key is not available.';
      }
      enrollERMButton.innerHTML = "Enrolling SSI ...";
      enrollERMButton.classList.add('spinning');
      alert(await enrollUserForSSI());
      enrollERMButton.classList.remove('spinning');
      enrollERMButton.innerHTML = "Enroll SSI";
    }, false);
  }
});

async function enrollUserForSSI() {
  var emailInput, result;
  emailInput = document.getElementById('emailInput');
  console.log("Email address provided by user: " + emailInput.value);
  result = await lookupUserName(emailInput.value);
  console.log("Lookup Username Result: - " + JSON.stringify(result));
  console.log("lookupStatus - ", result.data.lookupStatus);
  // if (result.headers['x-app-status'] == 200 && result.data.lookupStatus != 'PRESENT') {
  //   return "Failed at lookup status. Please check network log..."
  // }
  console.log("x-auth-code - " + result.headers['x-auth-code']);

  result = await generateAccessToken(result.headers['x-auth-code']);
  console.log("Generate Access Token Result - " + JSON.stringify(result));
  let accessToken = result.data.access_token;
  // if (result.headers['x-app-status'] != 201) {
  //   return "Failed at generate access token call. Please check network log..."
  // }
  console.log("access_token - ", accessToken);

  result = await generateOTP(accessToken);
  console.log("Generate OTP result - " + JSON.stringify(result));
  // if (result.headers['x-app-status'] != 200) {
  //   return "Failed at generate access token call. Please check network log..."
  // }

  result = await getOTP(emailInput.value);
  console.log("Get OTP Result - " + JSON.stringify(result));
  let token = result.data.lostPasswordToken;
  // if (result.headers['x-app-status'] != 200) {
  //   return "Failed at get OTP call. Please check network log..."
  // }
  console.log("OTP - ", token);

  result = await verifyOTP(emailInput.value, token, accessToken);
  console.log("Verify OTP Result - " + JSON.stringify(result));
  let fullAccesstoken = result.data.access_token;
  // if (result.headers['x-app-status'] != 201) {
  //   return "Failed at verify OTP call. Please check network log..."
  // }
  console.log("Full Access Token - ", fullAccesstoken);

  result = await spawn(fullAccesstoken);
  console.log("Spawn result - " + JSON.stringify(result));
  // if (result.headers['x-app-status'] != 201) {
  //   return "Failed at Spawn call. Please check network log..."
  // }


  result = await enrollStaySignedIn(fullAccesstoken);
  console.log("Enroll SSI Result - " + JSON.stringify(result));
  // if (result.headers['x-app-status'] != 200) {
  //   return "Failed at Enroll SSI call. Please check network log..."
  // }

  result = await spawnSSIEnroll(fullAccesstoken);
  console.log("SSI Spwan Result - " + JSON.stringify(result));
  // if (result.headers['x-app-status'] != 201) {
  //   return "Failed at Spawn call. Please check network log..."
  // }


  //Set Cookie
  const ssiEnroll = JSON.stringify({
    date: getSsiStorageExpireTimestamp(),
    username: emailInput.value
  });

  dropCookie('ssiEnabled', emailInput.value, ssiEnroll);

  return "Success";
}

function getSsiStorageExpireTimestamp() {
  return String(Number(new Date()) + SIX_MONTHS_IN_MS);
}

/**
 * overrides js-cookie's selective URI encoding.
 * this replace removes "3A|5B|5D|7B|7D" (":", "[", "]", "{" & "}")
 * quick link: http://www.w3schools.com/tags/ref_urlencode.asp
 * @param {!string} value
 * @return {string}
 */
function encodeURI(value) {
  value = encodeURIComponent(String(value)).replace(
    /%(23|24|26|2B|2F|3C|3E|3D|3F|40|5E|60|7C)/g,
    decodeURIComponent
  );
  return value;
}

function dropCookie(name, email, ssiEnroll) {
  if (name === 'ssiEnabled') {
    setCookie('ssiEnabled', encodeURI(ssiEnroll));
    setCookie('ermEnabled', encodeURI(ssiEnroll));
    setCookie('alwaysRemember', 'true');
    setCookie('username', email);
    setCookie('visited', 'true');
  } else if (name === 'ermEnabled') {
    setCookie('ssiEnabled', False);
    setCookie('ermEnabled', encodeURI(ssiEnroll));
    setCookie('alwaysRemember', 'true');
    setCookie('username', email);
    setCookie('visited', 'true');
  }
}

function setCookie(name, value) {
  const days = 2;
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function lookupUserName(userInformation) {
  idLookupJsonData.userName = userInformation;
  console.log(idLookupJsonData);

  // let lookupUserNameUri = 'https://vbox671.secure.checkout.visa.com/consumer-api/v1/lookupUserName?apikey=' + apiKey;
  let lookupUserNameUri = location.origin + '/consumer-api/v1/lookupUserName?apikey=' + apiKey;

  console.log("Identity Lookup URL : " + lookupUserNameUri);

  const options = {
    body: idLookupJsonData,
    method: 'POST',
    url: lookupUserNameUri,
    headers: {
      'x-api-key': 'SVC_CONSUMERSERVICE:8HQrJRTCGt',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    }
  };
  return fetchReq(options);
}

function generateAccessToken(xauthCode) {
  var contentLength, generateAccessTokenUrl;
  genAccessJsonData.code = xauthCode;
  genAccessJsonData.context = JSON.stringify(genAccessJsonData.context);
  console.log('genAccessJsonData', genAccessJsonData)
  contentLength = JSON.stringify(genAccessJsonData).length;
  // generateAccessTokenUrl = 'https://vbox671.secure.checkout.visa.com/apn/vdcp-web/oauth2/token';
  generateAccessTokenUrl = location.origin + '/apn/vdcp-web/oauth2/token';
  console.log("Generate Access Token URL : " + generateAccessTokenUrl);

  const options = {
    body: genAccessJsonData,
    method: 'POST',
    url: generateAccessTokenUrl,
    headers: {
      'Content-Length': contentLength,
      "x-api-key": "SVC_CONSUMERSERVICE:8HQrJRTCGt",
      'Content-Type': "application/x-www-form-urlencoded"
    }
  };
  return fetchReq(options);
}

function generateOTP(accessToken) {
  var generateOTPUrl;
  console.log('genOtpJsonData - ', genOtpJsonData);
  // generateOTPUrl = 'https://vbox671.secure.checkout.visa.com/accountServices/login/otp/generate';
  generateOTPUrl = location.origin + '/accountServices/login/otp/generate';
  console.log("Generate OTP URL : " + generateOTPUrl);

  const options = {
    body: genOtpJsonData,
    method: 'POST',
    url: generateOTPUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "access_token": accessToken,
    }
  };
  return fetchReq(options);
}

export function extractHostname(url) {
  var hostname;
  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }
  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];
  return hostname;
}

function verifyOTP(email, token, accessToken) {
  var contentLength, verifyOTPUrl;
  verifyOtpJsonData.password = token;
  verifyOtpJsonData.username = email;
  verifyOtpJsonData.context = JSON.stringify(verifyOtpJsonData.context);
  contentLength = JSON.stringify(verifyOtpJsonData).length;
  console.log('verifyOtpJsonData - ', verifyOtpJsonData);

  // verifyOTPUrl = 'https://vbox671.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/authorized/password';
  verifyOTPUrl = location.origin + '/apn/vdcp-web/oauth2/token/authorized/password';
  console.log("Verify OTP URL : " + verifyOTPUrl);
  const options = {
    body: verifyOtpJsonData,
    method: 'POST',
    url: verifyOTPUrl,
    headers: {
      'Content-Length': contentLength,
      "x-api-key": "SVC_CONSUMERSERVICE:8HQrJRTCGt",
      'Content-Type': "application/x-www-form-urlencoded",
      'Authorization': 'Bearer ' + accessToken
    }
  };
  return fetchReq(options);
}

function spawn(fullAccessToken) {
  var spawnUrl;
  spawnCallJsonData.subject_token = fullAccessToken;
  console.log('spawnCallJsonData - ', spawnCallJsonData);

  // spawnUrl = 'https://vbox671.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/spawn';
  spawnUrl = location.origin + '/apn/vdcp-web/oauth2/token/spawn';
  console.log("Spawn Call URL : " + spawnUrl);

  const options = {
    body: spawnCallJsonData,
    method: 'POST',
    url: spawnUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  return fetchReq(options);
}

function enrollStaySignedIn(fullAccessToken) {
  // let enrollStaySignedInUri = 'https://vbox671.secure.checkout.visa.com/consumer-api/v1/account/ARMGUID/ssi/enrollStaySignedIn?apikey=' + apiKey;
  let enrollStaySignedInUri = location.origin + '/consumer-api/v1/account/ARMGUID/ssi/enrollStaySignedIn?apikey=' + apiKey;
  console.log("Enroll Stay SignedIn URL : " + enrollStaySignedInUri);

  const options = {
    method: 'POST',
    url: enrollStaySignedInUri,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      "access_token": fullAccessToken
    }
  };
  return fetchReq(options);
}

function spawnSSIEnroll(fullAccessToken) {
  var spawnUrl;
  spawnCallSSIEnrollJsonData.subject_token = fullAccessToken;
  console.log('spawnCallSSIEnrollJsonData - ', spawnCallSSIEnrollJsonData);

  // spawnUrl = 'https://vbox671.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/spawn';
  spawnUrl = location.origin + '/apn/vdcp-web/oauth2/token/spawn';
  console.log("Spawn Call URL : " + spawnUrl);

  const options = {
    body: spawnCallSSIEnrollJsonData,
    method: 'POST',
    url: spawnUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  return fetchReq(options);
}
