import { gel } from './utils.js';
import { userInfo, intentPayload } from '../stubs/data.js';

export function setPointers(userInfo, intentPayload) {
  ui = userInfo;
  ip = intentPayload;
}

// To autofill the email in idlookup field
export function emailSetter(email) {
  if (email) {
    autoIdLookupEmailAddress(email);
    autoFillEmailAddressInCheckoutApirequest(email);
  }
}

// update email in idLookup payload
function autoIdLookupEmailAddress(email) {
  if (userInfo) {
    userInfo.identityValue = email;
    localStorage.setItem('email', email);
  }
}

// To autofill the email in checkout field
function autoFillEmailAddressInCheckoutApirequest(email) {
  if (intentPayload) {
    intentPayload.consumer.emailAddress = emailInput.value;
    intentPayload.consumer.consumerIdentity.identityValue = emailInput.value;
    intentPayload.consumer.mobileNumber.phoneNumber = '4153434433';
  }
}


export const setEmailErrorMessage = (msg) => {
  gel('email_error_message').innerHTML = msg;
}

// bootstrap
gel('emailInput').onblur = function populateEmail() {
  const email = this.value;
  emailSetter(email);
}
gel('emailInput').onfocus = () => {
  gel('email_error_message').innerHTML = '';
}
