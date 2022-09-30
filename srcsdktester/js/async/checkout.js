export async function checkout(adapter) {
  console.log('[checkout] start');
  const startTime = Date.now();

  var inputText = JSON.parse(document.getElementById('selectCardInput').value.trim());

  await adapter.checkout(inputText).then((response, error) => {
    console.log('Response from selectCard: %o', response);

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
