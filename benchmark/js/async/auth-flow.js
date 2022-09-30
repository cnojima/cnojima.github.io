import { getOTP } from '../helpers/get-otp.js';

export async function authFlow(adapter) {
  let otpCode;
  const email = localStorage.getItem('email');

  const res = await adapter.identityLookup({
    identityProvider: "SRC",
    identityValue: email,
    type: "EMAIL"
  });
  
  if (res.consumerPresent) {
    const res = await initiateIdentityValidation(adapter);
    
    if (res !== false) {
      otpCode = await getOTP();

      // manually enter for sandbox+
      if (!otpCode) {
        otpCode = prompt('Enter OTP');
      }

      return await completeIdentityValidation(adapter, {
        validationData: otpCode
      });
    }
  } else {
    console.warn(`${email} not present`);
  }

  return null;
}

async function completeIdentityValidation(adapter, code) {
  console.log("Validation Data => ", code);

  const response = await adapter.completeIdentityValidation(code);

  if (response['reason']) {
    console.log('Unable to verify OTP: %o', response);
  } else {
    console.log('Response from Verify OTP: %o', response);
  }
  return response;
}

async function initiateIdentityValidation(adapter) {
  return await adapter.initiateIdentityValidation().then((response) => {
    if (response['reason']) {
      console.warn('Unable to initialize Identity validation, error: %o', response);
      return false;
    }
    return response;
  });
}
