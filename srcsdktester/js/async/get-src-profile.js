export async function getSrcProfile(adapter) {
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
