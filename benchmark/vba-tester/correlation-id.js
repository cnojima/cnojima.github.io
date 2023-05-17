function generateRandomNumberString(length) {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += Math.round(Math.random() * 9);
  }
  return result;
}

function createCorrelationId() {
  const dateString = Date.now().toString();
  const randNum = generateRandomNumberString(2);
  const base64Hostname = window.btoa(location.hostname);
  const date1 = dateString.substring(0, 10);
  const date2 = dateString.substring(10, dateString.length);
  return `${date1}_${date2}_${randNum}_${base64Hostname}_CHECKOUT-WIDGET`;
}
