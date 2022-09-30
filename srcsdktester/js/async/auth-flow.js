export async function authFlow(adapter) {
  return await adapter.identityLookup({
    identityProvider: "SRC",
    identityValue: localStorage.getItem('email'),
    type: "EMAIL"
  }).then(async res => {
    if (res.consumerPresent) {
      const res = await initiateIdentityValidation(adapter);
      
      if (res !== false) {
        getOTP();
        const otp = prompt('Enter OTP');
        await completeIdentityValidation(adapter, {
          validationData: otp
        });
      }
    } else {
      console.warn('Consumer not present');
    }
  });
}

async function completeIdentityValidation(adapter, code) {
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

async function initiateIdentityValidation(adapter) {
  return await adapter.initiateIdentityValidation().then((response) => {
    if (response['reason']) {
      console.warn('Unable to initialize Identity validation, error: %o', response);
      return false;
    }
    return response;
  });
}
