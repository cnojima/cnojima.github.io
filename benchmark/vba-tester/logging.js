const ANDROID = 'Android';
const BLACKBERRY = 'BlackBerry';
const CHROME = 'Chrome';
const EDGE = 'Edge';
const FIREFOX = 'Firefox';
const MIUIBROWSER = 'MiuiBrowser';
const MSIE = 'MSIE';
const OPERA = 'Opera';
const PUFFIN = 'Puffin';
const SAFARI = 'Safari';
const SAMSUNGBROWSER = 'SamsungBrowser';
const UCBROWSER = 'UCBrowser';
const YABROWSER = 'YaBrowser';

function hasMobile(userAgent = '') {
  return userAgent.search(/mobi/i) !== -1;
}

function getBrowserName() {
  const userAgent = window.navigator.userAgent || '';
  let browserName = 'unknown';

  if (userAgent.search(/(?=^.*opera|opr)/i) !== -1) {
    browserName = OPERA;
  } else if (
    userAgent.search(
      /(?=^.*chrome)(?!^.*ucbrowser|ucweb)(?!^.*mi\sa1)(?!^.*yabrowser)(?!^.*samsungbrowser)(?!^.*edge)(?!^.*puffin).*/i
    ) !== -1
  ) {
    browserName = CHROME;
  } else if (
    userAgent.search(
      /(?=^.*android)(?!^.*puffin)(?!^.*edge)(?!^.*mi\sa1)(?!^.*yabrowser)(?!^.*samsungbrowser)(?!^.*ucbrowser)(?!^.*firefox)/i
    ) !== -1
  ) {
    browserName = ANDROID;
  } else if (
    userAgent.search(
      // eslint-disable-next-line max-len
      /(?=^.*safari)(?!^.*ucbrowser|ucweb)(?!^.*mi\sa1)(?!^.*bb\d\d)(?!^.*blackberry)(?!^.*yabrowser)(?!^.*edge)(?!^.*samsungbrowser)(?!^.*puffin)(?!^.*blackberry)(?!^.*firefox)(?!^.*fxios).*/i
    ) !== -1
  ) {
    browserName = SAFARI;
  } else if (userAgent.search(/(?=^.*firefox|fxios)(?!^.*puffin).*/i) !== -1) {
    browserName = FIREFOX;
  } else if (userAgent.search(/(?=^.*ucbrowser|ucweb)/i) !== -1) {
    browserName = UCBROWSER;
  } else if (userAgent.search(/(?=^.*msie|trident)/i) !== -1) {
    browserName = MSIE;
  } else if (userAgent.search(/(?=^.*puffin)/i) !== -1) {
    browserName = PUFFIN;
  } else if (userAgent.search(/(?=^.*samsungbrowser)/i) !== -1) {
    browserName = SAMSUNGBROWSER;
  } else if (userAgent.search(/(?=^.*yabrowser)/i) !== -1) {
    browserName = YABROWSER;
  } else if (userAgent.search(/(?=^.*mi\sa1)/i) !== -1) {
    browserName = MIUIBROWSER;
  } else if (userAgent.search(/(?=^.*edge)/i) !== -1) {
    browserName = EDGE;
  } else if (userAgent.search(/(?=^.*blackberry|bb\d\d)/i) !== -1) {
    browserName = BLACKBERRY;
  }

  // append mobile when found.
  if (hasMobile(userAgent)) {
    browserName += 'Mobile';
  }
  return browserName;
}

const logEvent = async (correlationId, payload) => {
  return fetch(
    `https://sandbox.secure.checkout.visa.com/logging/logEvent`,
    {
      method: 'POST',
      body: JSON.stringify({
        Browser: getBrowserName(),
        CO: 'PERF_VBA',
        CR: correlationId,
        E: 'VBA_PERF_TEST',
        LL: 'INFO',
        O: 'JSSDK',
        OS: navigator.platform,
        RTY: 'OUT',
        T: 'E',
        ...payload
      }),
      headers: {
        'X-CORRELATION-ID': correlationId
      },
    }
  );
}
