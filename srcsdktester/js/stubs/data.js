export const initData = {
  "srciTransactionId": "replace me",
  "srciDpaId": "DPAID",
  "srcInitiatorId": "[A-Fa-f0-9|A-Fa-f0-9]{8}\\-([A-Fa-f0-9|A-Fa-f0-9]{4}\\-){3}[A-Fa-f0-9|A-Fa-f0-9]{12}",
  "dpaData": {
      "srcDpaId" : "",
      "dpaPresentationName": "Disney Online",
      "dpaUri" : "http://www.disneyonline.com"
  },
  "dpaTransactionOptions" : {
      "dpaLocale" : "US",
      "dpaAcceptedBillingCountries" : ["US","CA"],
      "dpaAcceptedShippingCountries" : ["US","CA"],
      "dpaBillingPreference" : "FULL",
      "dpaShippingPreference" : "FULL",
      "consumerNameRequested" : true,
      "consumerEmailAddressRequested" : true,
      "consumerPhoneNumberRequested" : true,
      "paymentOptions" : {
          "dpaDynamicDataTtlMinutes" : 2,
          "dynamicDataType" : "DYNAMIC_CARD_SECURITY_CODE",
          "dpaPanRequested" : false
      },
      "reviewAction" : "continue",
      "transactionType" : "PURCHASE",
      "orderType" : "REAUTHORIZATION",
      "payloadTypeIndicator" : "SUMMARY",
      "transactionAmount" : {
          "transactionAmount" : "99.95",
          "transactionCurrencyCode" : "USD"
      },
      "merchantOrderId" : "28b1b61b-bbec-4637-b78f-33babc3b5187",
      "merchantCategoryCode" : "3000",
      "merchantCountryCode" : "US",
      "threeDsPreference": "NONE",
      "threeDsInputData" : {
          "requestorId" : "requestorId",
          "acquirerId" : "acquirerId",
          "acquirerMid" : "acquirerMid"
      },
      "customInputData":{
          "dpaIntegrationType":"PSP"
       }
  }
};

export const userInfo = {
    "identityProvider": "SRC",
    "identityValue": "senthilr@mailinator.com",
    "type": "EMAIL"
};

export const intentPayload = {
"srcCorrelationId": "",
"srciTransactionId": "",
"srcDigitalCardId": "",
"encryptedCard": "",
"idToken": "",
"windowRef": "",
"consumer":{
    "emailAddress": "ashok.vbox28@mailinator.com",
        "consumerIdentity":{
        "identityProvider":"SRC", 
        "identityType":"EMAIL_ADDRESS",
        "identityValue":"ashok.vbox28@mailinator.com"
        },
        "mobileNumber":{
        "phoneNumber":"",
        "countryCode":"1"
    },
    "nationalIdentifier": "USA",
    "countryCode": "US",
    "languageCode": "EN",
    "firstName": "PSP",
    "lastName": "Tester",
    "fullName": "Psp Tester"
},
"dpaTransactionOptions" : {
    "dpaLocale" : "US",
    "dpaAcceptedBillingCountries" : ["US","CA"],
    "dpaAcceptedShippingCountries" : ["US","CA"],
    "dpaBillingPreference" : "ALL",
    "dpaShippingPreference" : "ALL",
    "consumerNameRequested" : true,
    "consumerEmailAddressRequested" : true,
    "consumerPhoneNumberRequested" : true,
    "paymentOptions" : {
        "dpaDynamicDataTtlMinutes" : 2,
        "dynamicDataType" : "TAVV",
        "dpaPanRequested" : false
    },
    "reviewAction" : "continue",
    "checkoutDescription" : "Sample checkout",
    "transactionType" : "PURCHASE",
    "orderType" : "REAUTHORIZATION",
    "payloadTypeIndicator" : "SUMMARY",
    "transactionAmount" : {
        "transactionAmount" : "99.95",
        "transactionCurrencyCode" : "USD"
    },
    "merchantOrderId" : "ABC12345",
    "merchantCategoryCode" : "merchantCategoryCode",
    "merchantCountryCode" : "US",
    "threeDsInputData" : {
        "requestorId" : "requestorId",
        "acquirerId" : "acquirerId",
        "acquirerMid" : "acquirerMid"
    },
    "customInputData":{
        "dpaIntegrationType":"PSP"
    }
},
"payloadTypeIndicatorCheckout": "SUMMARY",
"recipientIdCheckout": "",
"payloadTypeIndicatorPayload": "SUMMARY",
"recipientIdPayload": "",
"assuranceData": {
    "verificationData":[{
    "verificationType": "CARDHOLDER",
    "verificationEntity": "01",
    "verificationMethod": "01",
    "verificationresponses": "01",
    "verificationTimestamp": "1646416550"
    }]
},
"srciActionCode": "NEW_USER" 
};

export const environmentKeys = {
    'Vbox444_Container': {
      srcInitiatorId: '3EY722QTUPZCY5X5A3IY21OLy4te0ZTO9KB3PJMW9ugdQ3ZAQ',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: '07750595-fcc1-0d2e-7388-11c5769e0201'
    },
    'Vbox671': {
      srcInitiatorId: 'SWOEJX022ZPXXQD3S8YN11FD4oyBr5InbFWGnFxrFGXUDjN6I',
      panEncryptionId: 'IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox28': {
      srcInitiatorId: 'J6XDQQQZ5CDSSJK0462Y11v-YWWFJ4O8G-3nTFwIIDwmqBLMM',
      panEncryptionId: 'J6XDQQQZ5CDSSJK0462Y11v-YWWFJ4O8G-3nTFwIIDwmqBLMM',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox441': {
      srcInitiatorId: '32V3GLT7MFPQJXXZCOTD119LoKEpmlgPaIAiSeMJFQQ9mUg-4',
      panEncryptionId: '32V3GLT7MFPQJXXZCOTD119LoKEpmlgPaIAiSeMJFQQ9mUg-4',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox442_Adyen': {
      srcInitiatorId: '8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox442': {
      srcInitiatorId: '3EY722QTUPZCY5X5A3IY21OLy4te0ZTO9KB3PJMW9ugdQ3ZAQ',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox444_ExternalSrci': {
      srcInitiatorId: '3EY722QTUPZCY5X5A3IY21OLy4te0ZTO9KB3PJMW9ugdQ3ZAQ',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox444_Adyen': {
      srcInitiatorId: '8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox444_PSP': {
      srcInitiatorId: 'TC03UO784YYUIR3BANUG11WE2pQEWgr5PpuIVbUZFB_oZLOco',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox444_3DS': {
      srcInitiatorId: '8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: 'ab1a4e6f-956c-a793-721f-133336dc270'
    },
    'Vbox734': {
      srcInitiatorId: 'KXL3FF1JNNZU0ORB0CDD11TQ5wPxPqdUH4c4k8PFKp7gFOzm8',
      panEncryptionId: 'SYZ0E01PYHJ4ZSXYU8FH11c8IkQyrrwgHsh3rWjAFhOc1J-lE',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox734_PSP': {
      srcInitiatorId: 'K02YEQRO0LLJBLK6XD0G11vP2Z_PwMKGR4qSeJW8TCQhJUdbk',
      panEncryptionId: 'SYZ0E01PYHJ4ZSXYU8FH11c8IkQyrrwgHsh3rWjAFhOc1J-lE',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'Vbox462': {
      srcInitiatorId: 'IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8',
      panEncryptionId: 'IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'QAINT': {
      srcInitiatorId: 'D257GCAOR3JGPTGACON811hN5odBtBaW0Z18OnXh3bhwFuH18',
      panEncryptionId: 'D257GCAOR3JGPTGACON811hN5odBtBaW0Z18OnXh3bhwFuH18',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'CERT': {
      srcInitiatorId: '3WQRGUSY6CESJS2KQSW811JXx9P1JLs2DrbOKqU9EXbfjreUo',
      panEncryptionId: '3WQRGUSY6CESJS2KQSW811JXx9P1JLs2DrbOKqU9EXbfjreUo',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'CERT1': {
      srcInitiatorId: 'B8VF3G544MK90PMQAG3I11nR-eWQmj3uhfs9dQXPEdjbmrpfo',
      panEncryptionId: 'L9A8ACW4DCTK83U2T4SB11NhQpVkp7mAh9NtnN5ms0wYu7wo0',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    },
    'SandBox': {
      srcInitiatorId: 'V6YPL0DFJ2V56HIH6Q3F133fbZWyAyIHjWVSecx6KMF6iTHGM',
      panEncryptionId: 'V6YPL0DFJ2V56HIH6Q3F133fbZWyAyIHjWVSecx6KMF6iTHGM',
      srciDpaId: 'matestdpa2',
      srcDpaId: ''
    },
    'Vbox444_Container_DockerEE': {
      srcInitiatorId: '3EY722QTUPZCY5X5A3IY21OLy4te0ZTO9KB3PJMW9ugdQ3ZAQ',
      panEncryptionId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
      srciDpaId: 'DPAID',
      srcDpaId: ''
    }
  };
