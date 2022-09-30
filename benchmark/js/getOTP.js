import {
    fetchReq
} from './helpers/fetch.js';
import {
    extractHostname
} from './enrollUserCookies.js';

$(function () {
    var fillCardInfoButton = document.querySelector('#getotp');
    
    fillCardInfoButton.addEventListener("click", async function () {
        let url = 'https://vbox671.secure.checkout.visa.com/srcsdktester/generateOtp';
        console.log("URL Formed:", url);
        
        // Get email
        var inputText = document.getElementById('idLookupInput').value;
        var email = JSON.parse(inputText).identityValue;
        console.log("Email:", email);

        // Get environment
        var environment;
        var VisaSdkPath = localStorage.getItem('srciDomain');
        if (VisaSdkPath) {
            environment = extractHostname(VisaSdkPath);
        }
        console.log("Environment:", environment);
        
        // Make indirect call to get OTP
        const options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'envn': environment,
                'email': email,
            }
        };
        let result = await fetchReq(options);
        console.log("Final get OTP Result - " + JSON.stringify(result));
        let token = result.data.otpValue;
        var inputText = document.getElementById('completeIdValidationInput').value;
        inputText = JSON.parse(inputText);
        inputText.validationData = token;
        document.getElementById('completeIdValidationInput').value = JSON.stringify(inputText, undefined, 4);
    }, false)
});
