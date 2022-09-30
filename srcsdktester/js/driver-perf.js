let authToken;
let srcCorrelationId;
let srcProfiles;

const gel = id => document.getElementById(id);

const catchErr = err => {
  console.trace(err);
  return err;
}

const intentPayload = {
  "srcCorrelationId": "",
  "srciTransactionId": "",
  "srcDigitalCardId": "",
  "encryptedCard": "",
  "idToken": "",
  "windowRef": "",
  "consumer":{
      "emailAddress": "ashok.vbox28@mailinator.com",
       "consumerIdentity":{
          "identityProvider":"SRC", 
          "identityType":"EMAIL_ADDRESS",
          "identityValue":"ashok.vbox28@mailinator.com"
       },
       "mobileNumber":{
          "phoneNumber":"",
          "countryCode":"1"
      },
      "nationalIdentifier": "USA",
      "countryCode": "US",
      "languageCode": "EN",
      "firstName": "PSP",
      "lastName": "Tester",
      "fullName": "Psp Tester"
  },
  "dpaTransactionOptions" : {
      "dpaLocale" : "US",
      "dpaAcceptedBillingCountries" : ["US","CA"],
      "dpaAcceptedShippingCountries" : ["US","CA"],
      "dpaBillingPreference" : "ALL",
      "dpaShippingPreference" : "ALL",
      "consumerNameRequested" : true,
      "consumerEmailAddressRequested" : true,
      "consumerPhoneNumberRequested" : true,
      "paymentOptions" : {
          "dpaDynamicDataTtlMinutes" : 2,
          "dynamicDataType" : "TAVV",
          "dpaPanRequested" : false
      },
      "reviewAction" : "continue",
      "checkoutDescription" : "Sample checkout",
      "transactionType" : "PURCHASE",
      "orderType" : "REAUTHORIZATION",
      "payloadTypeIndicator" : "SUMMARY",
      "transactionAmount" : {
          "transactionAmount" : "99.95",
          "transactionCurrencyCode" : "USD"
      },
      "merchantOrderId" : "ABC12345",
      "merchantCategoryCode" : "merchantCategoryCode",
      "merchantCountryCode" : "US",
      "threeDsInputData" : {
          "requestorId" : "requestorId",
          "acquirerId" : "acquirerId",
          "acquirerMid" : "acquirerMid"
      },
      "customInputData":{
          "dpaIntegrationType":"PSP"
      }
  },
  "payloadTypeIndicatorCheckout": "SUMMARY",
  "recipientIdCheckout": "",
  "payloadTypeIndicatorPayload": "SUMMARY",
  "recipientIdPayload": "",
  "assuranceData": {
      "verificationData":[{
      "verificationType": "CARDHOLDER",
      "verificationEntity": "01",
      "verificationMethod": "01",
      "verificationresponses": "01",
      "verificationTimestamp": "1646416550"
      }]
  },
  "srciActionCode": "NEW_USER" 
};




function extractHostname(url) {
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
const genId = () => Math.random().toString(36).substring(7);
const systemCorrelationId = `1_1492561111_766_48_${genId()}_CHECKOUT-WIDGET`;
const systemSessionId = `vme_qa_001${genId()}`;
function serializeObject(obj) {
  if (!obj) {
      return '';
  }

  var s = [];

  Object.keys(obj).forEach(function (key) {
      if (obj[key] && obj[key].constructor === Array) {
          obj[key].forEach(function (value) {
              s.push(key + '=' + encodeURIComponent(value));
          });
      } else {
          s.push(key + '=' + encodeURIComponent(obj[key]));
      }
  });

  return s.join('&');
};
function handleJsonResponse(res) {
  const headers = {};
  res.headers.forEach(function (v, k) {
      headers[k] = v;
  });
  console.log('headers - ' + JSON.stringify(headers));
  return (
      res
      .json()
      .then(function (data) {
          console.log('data', data);
          return {
              data: data,
              headers: headers
          }
      })
      .catch(function () {
          return {
              headers: headers
          }
      }))
};
function fetchReq(options) {
  const {
      url,
      body,
      method,
      headers
  } = options;
  headers['X-CORRELATION-ID'] = systemCorrelationId;
  headers['dfpSessionId'] = systemSessionId;
  headers['X-THMID'] = systemSessionId;

  const contentType = headers['Content-Type'];
  let finalBody = {};

  if (contentType.includes('x-www-form-urlencoded')) {
      finalBody = serializeObject(body);
  } else {
      finalBody = JSON.stringify(body);
  }
  console.log("Final Body data", body);
  return fetch(
          url,
          Object.assign({}, {
              body: finalBody,
              credentials: 'same-origin',
              headers: headers,
              method
          })
      )
      .then(res => handleJsonResponse(res))
      .then(data => data)
      .catch(error => {return error});
};
async function getOTP() {
  let url = location.origin + '/srcsdktester/generateOtp';
  console.log("URL Formed for getOTP:", url);
  
  // Get email
  var email = localStorage.getItem('email');
  console.log("Email:", email);

  // Get environment
  var environment;
  var VisaSdkPath = localStorage.getItem('srciDomain');
  if (VisaSdkPath) {
    environment = extractHostname(VisaSdkPath);
  }
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
    let token = result.data.otpValue;
    var inputText = document.getElementById('completeIdValidationInput').value;
    inputText = JSON.parse(inputText);
    inputText.validationData = token;
    document.getElementById('completeIdValidationInput').value = JSON.stringify(inputText, undefined, 4);
  } else {
    console.warn(`could not autoget OTP code from [${url}]`);
  }
}
// To autofill the email in idlookup field
function randomEmailPopulator() {
  var email = localStorage.getItem('email');
  var emailInput;
  if (email) {
    console.log("Email Address from Local Storage: " + email);
  }
  emailInput = document.getElementById('emailInput');
  emailInput.value = email;
  autoIdLookupEmailAddress();
  autoFillEmailAddressInCheckoutApirequest();
}
function autoIdLookupEmailAddress() {
  var emailInput, inputText;
  emailInput = document.getElementById('emailInput');
  inputText = document.getElementById('idLookupInput').value;
  inputText = JSON.parse(inputText);
  if (!("consumerIdentity" in inputText)) {
    inputText.identityValue = emailInput.value;
    document.getElementById('idLookupInput').value = JSON.stringify(inputText, undefined, 4);
    localStorage.setItem('email', emailInput.value);
  }
}
// To autofill the email in checkout field
function autoFillEmailAddressInCheckoutApirequest() {
  var emailInput, inputText;
  emailInput = document.getElementById('emailInput');
  inputText = document.getElementById('selectCardInput').value;
  inputText = JSON.parse(inputText);
  if ("consumer" in inputText) {
    inputText.consumer.emailAddress = emailInput.value;
    inputText.consumer.consumerIdentity.identityValue = emailInput.value;
    document.getElementById('selectCardInput').value = JSON.stringify(inputText, undefined, 4);
  }

  intentPayload.consumer.emailAddress = emailInput.value;
  intentPayload.consumer.consumerIdentity.identityValue = emailInput.value;
  intentPayload.consumer.mobileNumber.phoneNumber = '4153434433';
}
function populateDataInCardList(result) {
  let dropDown = document.getElementById('CardList');
  cardListResult = result.profiles[0].maskedCards;
  cardListResult.forEach(function (element) {
    option = document.createElement('option');
    option.value = element.panLastFour;
    option.text = element.panLastFour;
    dropDown.add(option);
  });
}
// Method to generate random UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
// To autofill UUID on every page refresh
function autoFillUUID() {
  srciTransactionId = uuidv4();
  console.log("srciTransactionId = ", srciTransactionId);

  let initInput = JSON.parse(document.getElementById('initInput').value);
  initInput.srciTransactionId = srciTransactionId;

  intentPayload.srciTransactionId = srciTransactionId;

  const initiatorId = localStorage.getItem('initiatorId');
  console.log("SRC-i initiatorId from Local Storage: " + initiatorId);
  if (initiatorId) {
    initInput.srcInitiatorId = initiatorId;
    // intentPayload.srcInitiatorId = initiatorId;
  } else if ((location.origin).includes("462")) {
    initInput.srcInitiatorId = 'IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8'; // API key
    // intentPayload.srcInitiatorId = 'IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8'; // API key
  } else {
    initInput.srcInitiatorId = 'IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4'; // API key
    // intentPayload.srcInitiatorId = 'IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4'; // API key
  }

  let srciDpaid = localStorage.getItem('srciDpaid');
  console.log("SRC-i DPAId from Local Storage: " + srciDpaid);
  if (srciDpaid) {
    initInput.srciDpaId = srciDpaid;
    // intentPayload.srciDpaId = srciDpaid;
  }

  let dpaid = localStorage.getItem('dpaid');
  console.log("SRC DPAId from Local Storage: " + dpaid);
  if (dpaid) {
    initInput.dpaData.srcDpaId = dpaid;
    // intentPayload.dpaData.srcDpaId = dpaid;
  }

  document.getElementById('initInput').value = JSON.stringify(initInput, undefined, 4);

  // Fill the same Transaction id in checkout API
  let selectCardInput = document.getElementById('selectCardInput');
  selectCardInput = selectCardInput.value.trim();
  selectCardInput = JSON.parse(selectCardInput);
  selectCardInput.srciTransactionId = srciTransactionId;
  document.getElementById('selectCardInput').value = JSON.stringify(selectCardInput, undefined, 4);
}



autoFillUUID();
randomEmailPopulator();


(async () => {
  // Default selection: Visa is the SRC-i
  const vcoAdapter = window.vAdapters.VisaSRCI;
  const adapter = new vcoAdapter();

  async function init() {
    console.log('[init] start');
    // init
    const initData = JSON.parse(document.getElementById('initInput').value.trim());
    let outputText = document.getElementById('initOutput');
    outputText.innerHTML = "";

    const startTime = Date.now();
    console.log("initData=> ", initData);
  
    await adapter.init(initData).then((response) => {
      if (!Object.keys(response).length) {
        outputText.innerHTML += "init() Success!!!!\n";
      } else {
        outputText.innerHTML += JSON.stringify(result, undefined, 4);
      }

      console.log('Init Response Data', JSON.stringify(response));
      return response;
    }).catch(catchErr);
  
    const endTime = Date.now();
    console.log(`[init] ttaken: ${(endTime - startTime)}ms`);
  }
  
  async function isRecognized() {
    console.log('[recognize] start');
    const startTime = Date.now();
    
    const ret = await adapter.isRecognized().catch(catchErr);

    if (ret.idTokens) {
      authToken = ret.idTokens[0];
      document.getElementById('getCustProfileInput').value = ret.idTokens[0];
    } else {
      gel('isRegOutput').innerHTML = JSON.stringify(ret, null, 2);
    }
  
    const endTime = Date.now();
    console.log(`[recognized] ttaken: ${(endTime - startTime)}ms`);
    return ret;
  }

  async function authFlow() {
    return await adapter.identityLookup({
      identityProvider: "SRC",
      identityValue: localStorage.getItem('email'),
      type: "EMAIL"
    }).then(async res => {
      if (res.consumerPresent) {
        const res = await initiateIdentityValidation();
        
        if (res !== false) {
          getOTP();
          const otp = prompt('Enter OTP');
          await completeIdentityValidation({
            validationData: otp
          });
        }
      } else {
        console.warn('Consumer not present');
      }
    });
  }

  async function completeIdentityValidation(code) {
    console.log("Validation Data => ", code);
    await adapter.completeIdentityValidation(code).then((response) => {
      if (response['reason']) {
        console.log('Unable to verify OTP: %o', response);
      } else {
        console.log('Response from Verify OTP: %o', response);
      }
      return response;
    });
  }
  

  async function initiateIdentityValidation() {
    return await adapter.initiateIdentityValidation().then((response) => {
      if (response['reason']) {
        console.warn('Unable to initialize Identity validation, error: %o', response);
        return false;
      }
      return response;
    });
  }
  

  
  async function getSrcProfile() {
    console.log('[getSrcProfile] start');
    const startTime = Date.now();

    await adapter.getSrcProfile(authToken).then((response) => {
      console.log('Response from getSrcProfile call: %o', response);
      
      if (response['reason']) {
        console.warn('Unable to get card list: %o', response);
      } else {
        console.log('%o', response);
      }
      srcCorrelationId = response.srcCorrelationId;
      srcProfiles = response.profiles;

      const endTime = Date.now();
      console.log(`[getSrcProfile] ttaken: ${(endTime - startTime)}ms`);

      // set first card
      intentPayload.srcDigitalCardId = srcProfiles[0].maskedCards[0].srcDigitalCardId;

      populateDataInCardList(response);
      
      //The below code will move id token to checkout API
      let selectCardInput = JSON.parse(document.getElementById('selectCardInput').value.trim());
      selectCardInput.idToken = srcProfiles[0].idToken;
      selectCardInput.srciTransactionId = srciTransactionId;
      selectCardInput.srcCorrelationId = srcCorrelationId;
      selectCardInput.srcDigitalCardId = srcProfiles[0].maskedCards[0].srcDigitalCardId;
      document.getElementById('selectCardInput').value = JSON.stringify(selectCardInput, undefined, 4);
    });
  }

  async function checkout() {
    console.log('[checkout] start');
    const startTime = Date.now();

    var inputText = JSON.parse(document.getElementById('selectCardInput').value.trim());

    await adapter.checkout(inputText).then((response, error) => {
      console.log('Response from selectCard: %o', response);

      // if (document.getElementById('maSimulator').checked) {
      //   adapter.isRecognized().then((response) => {
      //     console.log({ response });
      //     return response;
      //   })
      //     .catch(function (error) {
      //       console.log('Error in IsRecognized call to SRC System');
      //       console.log(error);
      //       return error;
      //     });
      // }
      if (response['reason']) {
        console.log('Unable to launch DCF: %o', error);
      } else {
        console.log('%o', response);
      }

      const endTime = Date.now();
      console.log(`[checkout] ttaken: ${(endTime - startTime)}ms`);
      return response;
    });
  }
  
  // Call init for Visa
  await init();
  // isRecognized
  await isRecognized();

  if (!authToken) {
    await authFlow();
  }
  await getSrcProfile();

  await checkout();

})().then().catch(catchErr);
