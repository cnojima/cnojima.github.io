import {
    fetchReq
} from './helpers/fetch.js';

$(function () {
    var fillCardInfoButton = document.querySelector('#fillCardInfoButton');
    if (fillCardInfoButton) {
        fillCardInfoButton.addEventListener("click", async function () {
            await fillCardInformation();
        }, false);
    }
});

async function fillCardInformation() {
    var result, cardChoices, cardSelected, locale, expDateArray;
    cardChoices = document.getElementById("cardType");
    cardSelected = cardChoices.options[cardChoices.selectedIndex].value;
    locale = getCookie("locale");
    if (locale && locale.includes("-")) {
        let locStr = locale.split("-");
        locale = locStr[1];
    } else {
        locale = 'US';
    }
    result = await getcardInformation(cardSelected, locale);
    console.log("Get Card details API response: ", JSON.stringify(result.data));
    var pretty = JSON.stringify(result.data, undefined, 4);
    var inputTextArea = document.getElementById('cardInformation');
    inputTextArea.value = pretty;
}

/******************* PSP FUNCTIONs *********************************/
$(function () {
    var fillCardInfoButton = document.querySelector('#fillCardInfoButtonPSP');
    if (fillCardInfoButton) {
        fillCardInfoButton.addEventListener("click", async function () {
            await fillCardInformationForPSP();
        }, false);
    }
});

async function fillCardInformationForPSP() {
    var result, cardChoices, cardSelected, locale, expDateArray;
    cardChoices = document.getElementById("cardType");
    cardSelected = cardChoices.options[cardChoices.selectedIndex].value;
    locale = getCookie("locale");
    if (locale && locale.includes("-")) {
        let locStr = locale.split("-");
        locale = locStr[1];
    } else {
        locale = 'US';
    }
    result = await getcardInformation(cardSelected, locale);
    console.log("Get Card details API response: ", JSON.stringify(result.data));

    var cardInfo = {
        card: {
            billingAddress: {}
        }
    };
    var inputText = result.data;
    if (inputText.ExpirationDate) {
        var expDateArray = inputText.ExpirationDate.split('/');
        cardInfo.card.cardSecurityCode = inputText.Cvv2Value;
        cardInfo.card.cardholderFullName = inputText.CardholderName || "SRC SDK";
        cardInfo.card.panExpirationMonth = parseInt(expDateArray[0]);
        cardInfo.card.panExpirationYear = parseInt('20' + expDateArray[1]);
        cardInfo.card.primaryAccountNumber = inputText.PrimaryAccountNumber;
        cardInfo.card.cardholderFirstName = "TestTool";
        cardInfo.card.cardholderLastName = "SampleData";
        cardInfo.card.paymentAccountReference = "";
        cardInfo.card.billingAddress.addressId = "";
        cardInfo.card.billingAddress.name = "";
        cardInfo.card.billingAddress.line1 = inputText.AddressStreet;
        cardInfo.card.billingAddress.line2 = inputText.AddressStreet2;
        cardInfo.card.billingAddress.line3 = inputText.AddressStreet3;
        cardInfo.card.billingAddress.city = inputText.City;
        cardInfo.card.billingAddress.state = inputText.State;
        cardInfo.card.billingAddress.countryCode = inputText.Country;
        cardInfo.card.billingAddress.zip = inputText.AddressPostalCode;
        cardInfo.card.billingAddress.createTime = "";
        cardInfo.card.billingAddress.lastUsedTime = "";
    }
    document.getElementById('pspCardInformation').value = JSON.stringify(cardInfo, undefined, 4);
}

function getcardInformation(cardSelected, locale) {
    // let cardUrl = 'https://vbox671.secure.checkout.visa.com/vmanage-test-agent/cards?type=' + cardSelected + '&country=' + locale;
    // let cardUrl = 'https://sl73vboxapq010:8443/vmanage-test-agent/cards?type=mc&country=US';
    let cardUrl = location.origin + '/vmanage-test-agent/cards?type=' + cardSelected + '&country=' + locale + '&bin=400552';
    console.log("URL FORMED: ", cardUrl);

    const options = {
        method: 'GET',
        url: cardUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        }
    };
    return fetchReq(options);
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
