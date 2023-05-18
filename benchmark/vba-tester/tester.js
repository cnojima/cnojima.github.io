const config = {
  automate: false,
  lite: null,
  stop: 25,
  version: null,
};

const versions = [
  '3.1.4.1', '3.1.4', '3.1.3', '3.1.2',
  '2.5.0', '2.4.0',
];

var VAAPConfig = {
  "output_section": "callback",
  "type": "lite"
};

let tokenInterval, count = 0, total = 0, size = 0, inAutomate = false;
let n0;

const handleQueryParams = () => {
  if (location.search) {
    location.search.replace('?', '').split('&').forEach(q => {
      switch (q) {
        case "automate":
          config.automate = true;
          break;
        default:
          const qs = q.split('=');
          config[qs[0]] = qs[1];
      }
    });
  }
};


const oldLog = console.log;
console.log = (s) => {
  const log = document.getElementById('log');
  oldLog(s);
  let output = log.innerHTML;
  output += "\n" + s;
  log.innerHTML = output;
}

function timeVbaGetToken() {
  let start = Date.now();

  VAAP.getToken(async vbaToken => {
    const tokenLen = `${(vbaToken.length / 1024).toPrecision(3)}kb`;
    size += vbaToken.length;

    const ms = (Date.now() - start);
    if (!n0) {
      n0 = ms;
    }
    total += ms;
    console.log(`[v${config.version} :: ${count}] ${ms}ms || ${tokenLen}`);
    count++;

    if (count >= config.stop) {
      clearInterval(tokenInterval);
      console.log(`Total VBA getToken() time: ${total / 1000}s`);
      console.log(`Average token size: ${(size / config.stop / 1024).toPrecision(3)}kb`);

      const resouces = performance.getEntriesByType('resource');
      const sdk = resouces.pop();
      const sdkLoadTime = sdk && `${(sdk.duration / 1000).toPrecision(3)}s`;

      const vbaLs = localStorage.getItem('vba_stats');
      const persist = (vbaLs) ? JSON.parse(vbaLs) : {};
      const payload = {
        sdkJSDownloadTime: sdkLoadTime || 'n/a',
        firstGetToken: `${(n0 / 1000).toPrecision(3)}s`,
        averageGetToken: `${(total / 1000 / config.stop).toPrecision(3)}s`,
        averageTokenSize: `${(size / config.stop / 1024).toPrecision(3)}kb`,
        totalGetToken: `${(total / 1000).toPrecision(3)}s`,
      };
      persist.ua = navigator.userAgentData || navigator.userAgent;
      persist[`${config.version}-${config.lite === 'true' ? 'lite' : 'full'}`] = payload;
      localStorage.setItem('vba_stats', JSON.stringify(persist));
      document.getElementById('results').innerHTML = JSON.stringify(persist, null, 2);

      // await logEvent(createCorrelationId(), vbaToken, {
      //   vbaVersion: config.version,
      //   vbaMode: config.lite === 'true' ? 'LITE' : 'FULL',
      //   ...payload
      // })

      if (inAutomate) {
        window.location = window.location;
      }
    }
  });
}

const setUI = () => {
  const sel = document.getElementById('version');

  for (let i=0; i<sel.options.length; i++) {
    const opt = sel.options[i];
    if (opt.value === config.version) {
      opt.selected = true;
    }
  }

  const lite = document.getElementById('lite');
  if (config.lite === 'true') {
    lite.checked = true;
  }
}

const loadScript = version => {
  console.log('[CONFIG]');
  for (let k in config) {
    console.log(` - ${k}: ${config[k]}`);
  }

  if (config.lite !== 'true') {
    console.log(` - VBA in full mode`);
    config.lite = 'false';
    delete VAAPConfig.type;
  } else {
    config.lite = 'true';
    console.log(` - VBA in lite mode`);
  }

  const js = document.createElement('script');
  js.id = 'vba_script';
  js.src = `./vba-${version}.min.js?ts=${Date.now()}`;
  js.addEventListener('load', e => {
    tokenInterval = setInterval(timeVbaGetToken, 250);


  });
  document.body.appendChild(js);
  console.log(` - loading VBA script: ${js.src}`);
}

const clearAutomation = () => {
  localStorage.clear();
  window.location = './index.html';
}

const handleAutomate = () => {
  let automate = localStorage.getItem('automate');
  
  if (config.automate || automate) {
    document.getElementById('start_automate').style.display = 'none';
    document.getElementById('stop_automate').style.display = 'block';
    inAutomate = true;
    // new run
    if (!automate || JSON.parse(automate).length === 0) {
      automate = [];
      versions.forEach(v => {
        automate.push(`${v}::lite`);
        automate.push(`${v}::full`);
      });
      automate = JSON.stringify(automate);
    }
  
    automate = JSON.parse(automate);
    const [version, type] = automate.pop().split('::');
    localStorage.setItem('automate', JSON.stringify(automate));

    // stop reloads
    if (automate.length < 1) {
      inAutomate = false;
    }
  
    config.version = version;
    config.lite = type === 'lite' ? 'true' : 'false';
  }
}

handleQueryParams();
handleAutomate();
setUI();

if (config.version) {
  loadScript(config.version);
} else {
  console.log('no version specified')
}
