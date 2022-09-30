export function extractHostname(url) {
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

export const catchErr = err => {
  console.trace(err);
  return err;
}

export const gel = id => document.getElementById(id);

export function serializeObject(obj) {
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
