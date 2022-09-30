var vco;
var srciVco;
var srci;

// Default selection: Visa is the SRC-i
var vcoAdapter = window.vAdapters.VisaSRCI;
vco = new vcoAdapter();
srciVco = vco;
srci = "Visa";

/* Makes SRC-i object based on user selection. Only used with main.html */
function makeSrciVco() {
  srci = document.querySelector('input[name="srci"]:checked').value;
  if (srci === "Amex") {
    srciVco = window.AmexSS.getInstance();
  } else if (srci === "Mastercard") {
    srciVco = window.SRCSDK_MASTERCARD;
  } else if (srci === "Discover") {
    srciVco = window.DGNCheckout;
  } else {
    srciVco = vco;
  }
  console.log(srci + " object created");
}

var cardListResult, srciTransactionId, srcCorrelationId;

/* Init methods */
// Need this method only for that call back method. This is used by WebdriverIo framework
async function init(initData, agent, done) {
  console.log(agent + " initData=> ", initData);
  if (agent === "Visa") {
    var currentVco = vco;
  } else {
    var currentVco = srciVco;
  }

  const foo = await currentVco.init(initData).then((response) => {
    console.log('Init result received from ' + agent + ' SRC System');
    console.log('Response Data', JSON.stringify(response));
    return response;
  })
    .catch(function (error) {
      console.log('Error in Init call to ' + agent + ' SRC System');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function initCall() {
  var inputText = document.getElementById('initInput');
  inputText = inputText.value.trim();
  var outputText = document.getElementById('initOutput');
  outputText.innerHTML = "";

  // Call init for Visa
  init(JSON.parse(inputText), "Visa", (result) => {
    if (!Object.keys(result).length) {
      outputText.innerHTML += "Visa init() Success!!!!\n";
    } else {
      outputText.innerHTML += syntaxHighlight(JSON.stringify(result, undefined, 4)) + '\n';
    }
  });

  // Call init for Partner (only used with main.html)
  // This block is never executed for pages where user doesn't have the option to select the SRC-i
  if (srci !== "Visa") {
    var massagedData = massageInitData(inputText, srci);
    init(JSON.parse(massagedData), srci, (result) => {
      if (!result) {
        outputText.innerHTML += srci + " init() Success!!!!\n";
      } else {
        outputText.innerHTML += syntaxHighlight(JSON.stringify(result, undefined, 4)) + '\n';
      }
    });
  }
}

/* IsRecognized methods */
async function isRecognizedJava() {
  const foo = await vco.isRecognized().then((response) => {
    return response;
  })
    .catch(function (error) {
      console.log('Error in IsRecognized call to SRC System');
      console.log(error);
      return error;
    });
  return foo;
}

async function isRecognized(agent, done) {
  if (agent === "Visa") {
    var currentVco = vco;
  } else {
    var currentVco = srciVco;
  }
  const foo = await currentVco.isRecognized().then((response) => {
    return response;
  })
    .catch(function (error) {
      console.log(agent + 'error in IsRecognized call to SRC System');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function isRecognizedCall() {
  var outputText = document.getElementById('isRegOutput');
  outputText.innerHTML = "";

  // Call for Visa
  isRecognized("Visa", (result) => {
    // Fill Id token in get SRC Profile input
    if (result.idTokens) {
      document.getElementById('getCustProfileInput').value = result.idTokens[0];
    }
    // Display result
    outputText.innerHTML += 'Visa:\n'
    outputText.innerHTML += syntaxHighlight(JSON.stringify(result, undefined, 4)) + '\n\n';
    console.log(result);
  });

  // Call for Partner
  if (srci !== "Visa") {
    isRecognized(srci, (result) => {
      // Fill Id token in get SRC Profile input
      if (result.idTokens && srci === "Amex") {
        document.getElementById('getCustProfileInput').value = result.idTokens[0];
      } else if (result.idTokens) {
        idToken = result.idTokens[0];
        var inputText = document.getElementById('getCustProfileInput');
        inputText = inputText.value.trim();
        inputText = JSON.parse(inputText);
        inputText.idTokens = [idToken];
        document.getElementById('getCustProfileInput').value = JSON.stringify(inputText, undefined, 4);
      }
      // Display result
      outputText.innerHTML += srci + ':\n';
      outputText.innerHTML += syntaxHighlight(JSON.stringify(result, undefined, 4)) + '\n\n';
      console.log(result);
    });
  }
}


/* ID Lookup methods */
async function identityLookupJava(lookupData) {
  console.log("identityLookup Data => ", JSON.parse(lookupData));
  const foo = await vco.identityLookup(JSON.parse(lookupData)).then((response) => {
    return response;
  })
    .catch(function (error) {
      console.log('Error in identityLookup call to SRC System');
      console.log(error);
      return error;
    });
  return foo;
}

async function identityLookup(inputText, done) {
  console.log("identityLookup Data => ", inputText);
  const foo = await srciVco.identityLookup(inputText).then((response) => {
    return response;
  })
    .catch(function (error) {
      console.log('Error in identityLookup call to SRC System');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function identityLookupCall() {
  var inputText = document.getElementById('idLookupInput');
  inputText = inputText.value.trim();
  if (srci !== "Visa") {
    inputText = massageIdLookupData(inputText, srci);
  }
  identityLookup(JSON.parse(inputText), (result) => {
    var outputText = document.getElementById('idLookupOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    console.log(result);
  });

}


/* Generate Access Token methods */


async function initiateIdentityValidation(done) {
  const foo = await srciVco.initiateIdentityValidation().then((response) => {
    if (response['reason']) {
      console.log('Unable to initialize Identity validation, error: %o', response);
    } else {
      console.log('Response from initialize Identity validation: %o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in initialize Identity validation call');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function initiateIdentityValidationCall() {
  initiateIdentityValidation((result) => {
    var outputText = document.getElementById('initIdValidationOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    console.log(result);
  });
}


/* Verify OTP methods */
async function completeIdentityValidationJava(code) {
  var inputText = JSON.parse(code);
  if (inputText && typeof inputText === "object") {
    // do nothing. Just pass as JSON
  } else {
    inputText = new String(inputText);
  }
  console.log("Final data passed to complete identity validation method : ", inputText);
  const foo = await vco.completeIdentityValidation(inputText).then((response) => {
    if (response['reason']) {
      console.log('Unable to verify OTP: %o', response);
    } else {
      console.log('Response from Verify OTP: %o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Verify OTP call');
      console.log(error);
      return error;
    });
  return foo;
}

async function completeIdentityValidation(code, done) {
  console.log("Validation Data => ", code);
  const foo = await srciVco.completeIdentityValidation(code).then((response) => {
    if (response['reason']) {
      console.log('Unable to verify OTP: %o', response);
    } else {
      console.log('Response from Verify OTP: %o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Verify OTP call');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function completeIdentityValidationCall() {
  var codeText = document.getElementById('completeIdValidationInput');
  codeText = codeText.value.trim();
  if (srci === "Amex") {
    codeText = massageValDataAmex(codeText);
  }
  if (typeof (codeText) !== String) {
    codeText = JSON.parse(codeText);
  } else {
    codeText = new String(codeText);
  }
  completeIdentityValidation(codeText, (result) => {
    // Fill Id token in get SRC Profile input
    if (result.idToken) {
      document.getElementById('getCustProfileInput').value = result.idToken;
    }

    var outputText = document.getElementById('completeIdValidationOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    console.log(result);
  });
}


/* Get Card List */
async function getSrcProfile(inputText, done) {
  console.log("idToken passed : " + inputText);
  // const foo = await vco.getSrcProfile().then((response) => {
  const foo = await vco.getSrcProfile(inputText).then((response) => {
    console.log('Response from getSrcProfile call: %o', response);
    if (response['reason']) {
      console.log('Unable to get card list: %o', response);
    } else {
      console.log('%o', response);
    }
    srcCorrelationId = response.srcCorrelationId;
    return response;
  })
    .catch(function (error) {
      console.log('Error in Get Customer Profile call');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function getSrcProfileCall() {
  var inputText = document.getElementById('getCustProfileInput');
  inputText = inputText.value.trim();

  try {
    var obj = JSON.parse(inputText);
    if (obj && typeof obj === "object") {
      inputText = obj;
    }
  } catch (e) {
    // do nothing
  }
  // inputText = inputText.split(",");
  getSrcProfile(inputText, (result) => {
    var outputText = document.getElementById('getCustProfileOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    populateDataInCardList(result);
  });
}


/* Select Card */
async function checkoutJava(cardId) {
  console.log('Card Id Selected by User: %o', cardId);
  const foo = await vco.checkout(cardId, {}).then((response, error) => {
    console.log('Response from selectCard: %o', response);
    if (response['reason']) {
      console.log('Unable to launch DCF: %o', error);
    } else {
      console.log('%o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Select Card For Checkout call');
      console.log(error);
      return error;
    });
  return foo;
}

async function checkout(inputText, done) {
  console.log("Select card for checkout input object : ", inputText);
  const foo = await vco.checkout(inputText).then((response, error) => {
    console.log('Response from selectCard: %o', response);
    if (document.getElementById('maSimulator').checked) {
      vco.isRecognized().then((response) => {
        console.log({ response });
        return response;
      })
        .catch(function (error) {
          console.log('Error in IsRecognized call to SRC System');
          console.log(error);
          return error;
        });
    }
    if (response['reason']) {
      console.log('Unable to launch DCF: %o', error);
    } else {
      console.log('%o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Select Card For Checkout call');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function checkoutCall() {
  var inputText = document.getElementById('selectCardInput');
  inputText = inputText.value.trim();
  inputText = JSON.parse(inputText);
  if (inputText.hasOwnProperty('windowRef')) {
    console.log("Window Ref Present. Tool creating own window.");
    // Pass popup window object
    if (document.getElementById("SrciWindowCheckbox").checked) {
      inputText.windowRef = newPopupRef;
    }
    // Pass iframe object
    if (document.getElementById("SrciIframeCheckbox").checked) {
      inputText.windowRef = dcfiframe;
    }
  } else {
    console.log("Window Ref is not passed. Allowing SDK to create its own window.");
  }

  checkout(inputText, (result) => {
    var outputText = document.getElementById('selectCardOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    console.log(result);
  });
}

/* Enroll Card For Checkout*/
async function enrollCardJava(inputText) {
  console.log("Enroll card for checkout input object : ", inputText);
  const foo = await vco.enrollCard(inputText).then((response, error) => {
    console.log('Response from EnrollCard: %o', response);
    if (response['reason']) {
      console.log('Unable to launch DCF: %o', error);
    } else {
      console.log('%o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Enroll Card For Checkout call');
      console.log(error);
      return error;
    });
  return foo;
}

async function enrollCard(inputText, done) {
  console.log("Enroll card for checkout input object : ", inputText);
  const foo = await vco.enrollCard(inputText).then((response, error) => {
    console.log('Response from EnrollCard: %o', response);
    if (response['reason']) {
      console.log('Unable to launch DCF: %o', error);
    } else {
      console.log('%o', response);
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in Enroll Card For Checkout call');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function enrollCardCall() {
  var inputText = document.getElementById('enrollCardInput');
  inputText = inputText.value.trim();
  enrollCard(JSON.parse(inputText), (result) => {
    var outputText = document.getElementById('enrollCardOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
    console.log(result);
  });
}


/* Unbind methods */
async function unBindJava(unBindData) {
  var inputText = JSON.parse(unBindData);
  console.log("Final data passed to Unbind method : ", inputText);
  const foo = await vco.unbindAppInstance(inputText).then((response) => {
    if (response['reason']) {
      console.log('Unable to Unbind: %o', response);
    } else {
      console.log('Response Data', JSON.stringify(response));
    }
    return response;
  })
    .catch(function (error) {
      console.log('Error in unBind call to SRC System');
      console.log(error);
      return error;
    });
  return foo;
}

async function unBind(unBindData, done) {
  console.log("unBindData=> ", unBindData);

  const foo = await vco.unbindAppInstance(unBindData).then((response) => {
    console.log('UnBind result received from Visa SRC System');
    console.log('Response Data', JSON.stringify(response));
    return response;
  })
    .catch(function (error) {
      console.log('Error in unBind call to SRC System');
      console.log(error);
      return error;
    });
  done(foo);
  return foo;
}

function unBindCall() {
  var inputText = document.getElementById('unBindInput');
  inputText = inputText.value.trim();
  unBind(JSON.parse(inputText), (result) => {
    var outputText = document.getElementById('unBindOutput');
    outputText.innerHTML = syntaxHighlight(JSON.stringify(result, undefined, 4));
  });
}

/* Other methods */

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });

}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(autoFillUUID);
addLoadEvent(prettyPrint);
// addLoadEvent(scrollIntoView);
addLoadEvent(randomEmailPopulator);

// To align the JSON inside input textarea
function prettyPrint() {
  var inputTextArea = document.getElementsByClassName('jsoncontent');
  for (let x = 0; x < inputTextArea.length; x++) {
    var ugly = inputTextArea[x].value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    inputTextArea[x].value = pretty;
  };

}

// To scroll into view
function scrollIntoView() {
  var textareaEle = document.getElementsByClassName('textarea');
  for (let x = 0; x < textareaEle.length; x++) {
    textareaEle[x].addEventListener("focus", function (event) {
      textareaEle[x].scrollIntoView({
        behavior: "smooth"
      });
    });
  }
}

// To autofill UUID on every page refresh
function autoFillUUID() {
  srciTransactionId = uuidv4();
  console.log("srciTransactionId = ", srciTransactionId);
  var inputText = document.getElementById('initInput').value;
  inputText = JSON.parse(inputText);
  inputText.srciTransactionId = srciTransactionId;
  var initiatorId = localStorage.getItem('initiatorId');
  console.log("SRC-i initiatorId from Local Storage: " + initiatorId);
  if (initiatorId) {
    inputText.srcInitiatorId = initiatorId;
  } else if ((location.origin).includes("462")) {
    inputText.srcInitiatorId = 'IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8'; // API key
  } else {
    inputText.srcInitiatorId = 'IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4'; // API key
  }

  var srciDpaid = localStorage.getItem('srciDpaid');
  console.log("SRC-i DPAId from Local Storage: " + srciDpaid);
  if (srciDpaid) {
    inputText.srciDpaId = srciDpaid;
  }

  var dpaid = localStorage.getItem('dpaid');
  console.log("SRC DPAId from Local Storage: " + dpaid);
  if (dpaid) {
    inputText.dpaData.srcDpaId = dpaid;
  }

  document.getElementById('initInput').value = JSON.stringify(inputText, undefined, 4);

  // Fill the same Transaction id in checkout API
  var inputText = document.getElementById('selectCardInput');
  inputText = inputText.value.trim();
  inputText = JSON.parse(inputText);
  inputText.srciTransactionId = srciTransactionId;
  document.getElementById('selectCardInput').value = JSON.stringify(inputText, undefined, 4);
}

// Method to generate random UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function randomEmailPopulator() {
  var email = localStorage.getItem('email');
  var emailInput;
  if (email) {
    console.log("Email Address from Local Storage: " + email);
  } else {
    // var emailArray = ["srcsdk1@mailinator.com", "srcsdk2@mailinator.com", "srcsdk3@mailinator.com", "srcsdk4@mailinator.com", "srcsdk5@mailinator.com", "srcsdk6@mailinator.com", "srcsdk7@mailinator.com", "senthilr@mailinator.com", "senthilk@mailinator.com"];
    // email = emailArray[Math.floor(Math.random() * emailArray.length)];
  }
  emailInput = document.getElementById('emailInput');
  emailInput.value = email;
  autoIdLookupEmailAddress();
  autoFillEmailAddressInCheckoutApirequest();
}

// To autofill the email in idlookup field
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
}

// Method to read getCustomerProfile response and fill card list drop down.
function populateDataInCardList(result) {
  let dropDown = document.getElementById('CardList');
  cardListResult = result.profiles[0].maskedCards;
  cardListResult.forEach(function (element) {
    option = document.createElement('option');
    option.value = element.panLastFour;
    option.text = element.panLastFour;
    dropDown.add(option);
  });

  //The below code will move id token to checkout API
  var inputText = document.getElementById('selectCardInput').value;
  inputText = JSON.parse(inputText);
  inputText.idToken = result.profiles[0].idToken;
  inputText.srciTransactionId = srciTransactionId;
  inputText.srcCorrelationId = srcCorrelationId;
  document.getElementById('selectCardInput').value = JSON.stringify(inputText, undefined, 4);
}

// On click of 'Apply Select Card' button this method will be triggered.
// It will fill the required information in SelectCard API input text 
function selectCard() {
  var selectCardInput, cardList, cardSelected;
  cardList = document.getElementById("CardList");
  cardSelected = cardList.options[cardList.selectedIndex].value;
  cardListResult.forEach(function (element) {
    if (cardSelected === element.panLastFour) {
      // console.log(element.srcDigitalCardId);

      //Use this when Select card API is completely implemented.
      selectCardInput = document.getElementById('selectCardInput').value;
      selectCardInput = JSON.parse(selectCardInput);
      selectCardInput.srcDigitalCardId = element.srcDigitalCardId;
      console.log("Select Card Input: ", selectCardInput);
      document.getElementById('selectCardInput').value = JSON.stringify(selectCardInput, undefined, 4);

      // document.getElementById('selectCardInput').value = element.srcDigitalCardId;
    }
  });
}


// On click of 'Append ComplianceSettings' button this method will be triggered.
// It will Append ComplianceSettings information in checkout inout JSON 
function appendComplianceSettings() {
  var selectCardInput;
  selectCardInput = document.getElementById('selectCardInput').value;
  selectCardInput = JSON.parse(selectCardInput);
  selectCardInput.complianceSettings = {};
  selectCardInput.complianceSettings.complianceResources = [];
  var terms = {};
  terms.complianceType = "TERMS_AND_CONDITIONS";
  terms.uri = "usa.visa.com/legal/checkout/terms-of-service.html";
  var privacy = {};
  privacy.complianceType = "PRIVACY_POLICY";
  privacy.uri = "usa.visa.com/legal/global-privacy-notice.html";
  var remember = {};
  remember.complianceType = "REMEMBER_ME";
  remember.uri = "visa.checkout.com/privacy";

  selectCardInput.complianceSettings.complianceResources[0]= terms;
  selectCardInput.complianceSettings.complianceResources[1]= privacy;
  selectCardInput.complianceSettings.complianceResources[2]= remember;      
  console.log("Select Card Input: ", selectCardInput);
  document.getElementById('selectCardInput').value = JSON.stringify(selectCardInput, undefined, 4);
}
