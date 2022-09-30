var newPopupRef, dcfiframe;
function loadScripts(array, callback) {
    var loader = function (src, handler) {
        var script = document.createElement("script");
        script.src = src[0];
        script.type = src[1];
        script.async = false;
        script.onload = script.onreadystatechange = function () {
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild(script);
    };
    (function run() {
        if (array.length != 0) {
            loader(array.shift(), run);
        } else {
            callback && callback();
        }
    })();
}

var srciDomain = localStorage.getItem('srciDomain');
console.log("SRC Domain from Local Storage: " + srciDomain);
var url;
if (srciDomain) {
    url = srciDomain;
} else if ((location.origin).includes('localhost')) {
    url = "https://vbox671.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visaSdk.js";
    localStorage.setItem('srciDomain', 'vbox671');
} else {
    url = location.origin + "/checkout-widget/resources/js/src-i-adapter/visaSdk.js";
    localStorage.setItem('srciDomain', url);
}
console.log("SRC SDK downloaded from path : " + url);
loadScripts([
    [url, "text/javascript"],
    ["js/driverScript.js", "text/javascript"],
    ["transpiled/PANJwEncryption.js", "text/javascript"],
    ["js/getCardInformation.js", "module"],
    ["js/getOTP.js", "module"]
], function () {
    console.log('All scripts are loaded');
});

function openDcfWindow(element) {
    console.log(element.value);
    if(element.value == 'CreateIframe') {
        dcfiframe = document.createElement('iframe');
        dcfiframe.src = 'dummyLoader.html';
        dcfiframe.setAttribute('id','dcf_iframe');
        document.body.appendChild(dcfiframe);
        if(newPopupRef) {newPopupRef.close()};
    } else if(element.value == 'CreatePopup') {
        newPopupRef = window.open('dummyLoader.html', 'DCF', 'height=600,width=400');
        window.focus();
        newPopupRef.blur();
        if(dcfiframe) {
            document.body.removeChild(document.getElementById("dcf_iframe"));
        }
    }
}
