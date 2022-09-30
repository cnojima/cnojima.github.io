function saveToLocalStorage() {
    if (localStorage) {
        localStorage.clear();

        var initiatorIdChoice = document.getElementById("initiator");
        var panEncryIdChoice = document.getElementById("panEncrytionId");
        var srciDomainChoice = document.getElementById("domain");
        var srcDpaIdChoice = document.getElementById("dpaid");
        var srciDpaIdChoice = document.getElementById("srciDpaid");
        var emailAddress = document.getElementById("email");
        console.log("senthil - ", initiatorIdChoice.innerText);
        var initiatorId = initiatorIdChoice.value;
        var panEncryId = panEncryIdChoice? panEncryIdChoice.value:'';
        var srciDomain = srciDomainChoice?srciDomainChoice.value:'';
        var dpaid = srcDpaIdChoice?srcDpaIdChoice.value:'';
        var srciDpaid = srciDpaIdChoice?srciDpaIdChoice.value:'';
        var email = emailAddress.value;

        localStorage.setItem('initiatorId', initiatorId);
        localStorage.setItem('panEncryId', panEncryId);
        localStorage.setItem('srciDomain', srciDomain);
        localStorage.setItem('dpaid', dpaid);
        localStorage.setItem('srciDpaid', srciDpaid);
        localStorage.setItem('email', email);
    }
}

function saveSdkPathNickName(sel) {
    localStorage.setItem('sdkPathNickName', sel.options[sel.selectedIndex].text);

    var VisaSdkPath = localStorage.getItem('sdkPathNickName');
    var env = extractSdkNickName(VisaSdkPath);

    var envConfig = window.envValidApiKey[env];
    var srcInitiatorId = envConfig ? envConfig.srcInitiatorId : 'Please Select';
    var panEncryptionId = envConfig ? envConfig.panEncryptionId : 'Please Select';
    var srciDpaId = envConfig ? envConfig.srciDpaId : 'Please Select';
    var srcDpaId = envConfig ? envConfig.srcDpaId : 'Optional';

    document.getElementById('initiator').value = srcInitiatorId;
    document.getElementById('panEncrytionId').value = panEncryptionId;
    document.getElementById('dpaid').value = srcDpaId;
    document.getElementById('srciDpaid').value = srciDpaId;

    console.log("Environment Selected: " + env);
    console.log("SRCi Initiator ID: " + srcInitiatorId);
    console.log("PAN Encryption ID: " + panEncryptionId);
    console.log("Srci DPA ID: " + srciDpaId);
    console.log("Src DPA ID: " + srcDpaId);
}

//PBC
function saveEurekaSdkPathNickName(sel) {
    localStorage.setItem('sdkPathNickName', sel.options[sel.selectedIndex].text);

    var VisaSdkPath = localStorage.getItem('sdkPathNickName');
    var env = extractSdkNickName(VisaSdkPath);

    var envConfig = window.envValidApiKey[env];
    var srcInitiatorId = envConfig ? envConfig.srcInitiatorId : 'Please Select';

    document.getElementById('initiator').value = srcInitiatorId;

    console.log("Environment Selected: " + env);
    console.log("API KEY: " + srcInitiatorId);
}

function extractSdkNickName(url) {
    var hostname = url.split('-')[0];
    return hostname.trim();
}