import { benchmark, benchmarkState } from '../stubs/data.js';
import { canGetOtp, getOTP } from '../helpers/get-otp.js';
import { gel } from '../helpers/utils.js';

export async function authFlow(adapter) {
  let otpCode;
  const email = localStorage.getItem('email');
  
  const identityLookupStart = Date.now();
  const res = await adapter.identityLookup({
    identityProvider: "SRC",
    identityValue: email,
    type: "EMAIL"
  });
  benchmark.identityLookup = Date.now() - identityLookupStart;
  
  if (res.consumerPresent) {
    const initiateIdentityValidationStart = Date.now();
    const res = await initiateIdentityValidation(adapter);
    benchmark.initiateIdentityValidation = Date.now() - initiateIdentityValidationStart;
    
    if (res !== false) {
      if (canGetOtp(benchmarkState.sdkUrl)) {
        otpCode = await getOTP();
      }

      // manually enter for sandbox+
      if (!otpCode) {
        otpCode = prompt('Enter OTP');
      }

      const completeIdentityValidationStart = Date.now();
      const res = await completeIdentityValidation(adapter, {
        validationData: otpCode
      });
      benchmark.completeIdentityValidation = Date.now() - completeIdentityValidationStart;

      gel('auth_complete').checked = true;
      gel('auth_complete_timing').innerHTML = `${(benchmark.identityLookup + benchmark.initiateIdentityValidation + benchmark.completeIdentityValidation) / 1000}s`;
      gel('auth_breakdown').innerHTML = `[identityLookup: ${benchmark.identityLookup}ms]<br/>[initiateIdentityValidation: ${benchmark.initiateIdentityValidation}ms]<br/>[completeIdentityValidation: ${benchmark.completeIdentityValidation}ms]`;
      return res;
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
