# Uqudo SDK VanillaJS Demo Sample App

This project contains sample applications for VanillaJs that demonstrate the usage of the Uqudo SDK for passport onboarding with facial recognition.

## Prerequisites

Before you begin, ensure you have the following:

- An Uqudo Access Token.
- file UqudoSDK.js contains code of SDK web library.

## Setup and Installation

1. Clone the project from the repository.

    ```sh
    git clone https://github.com/uqudo-com/sample-app-web-javascript.git
    ```

2. Open the project in your IDE and navigate to vanillaJS folder.

3. Replace the `ACCESS_TOKEN_HERE` placeholder with the actual access token in the `index.html` file.

    ```js
    const ACCESS_TOKEN = "ACCESS_TOKEN_HERE"
    ```

## Running the app

run server localhost in this folder you can use live-server or another tool.

## Features

- Passport onboarding
- Facial recognition
- Handle Enrollment results

## How it works

Set your UQUDO_ACCESS_TOKEN, which is your access token, required for authentication with the Uqudo SDK.

```javascript
const UQUDO_ACCESS_TOKEN = "ACCESS_TOKEN";
```

Create an instance of the Uqudo SDK using the provided access token.

```javascript
const uqudoSdk = uqudoSdkFactory.create({
  accessToken: UQUDO_ACCESS_TOKEN,
});
```

Define the enrollmentPassport function, which is triggered when the "Enroll Passport" button is clicked.
This function initiates the passport enrollment process with specific configuration options:

- The documentType is set to Passport, and other options like disableExpiryValidation, forceUpload, and enableAgeVerification are configured according to your requirements.
- The face recognition settings are also configured, including options for enableFacialRecognition, enrollFace, and maxAttempts.
- Callback functions for onError and onSuccess are defined to handle errors and successful enrollment responses.

```javascript
  function enrollmentPassport() {
      console.debug("enrollment start");
      uqudoSdk.enrollment({
        scan: [
          {
            documentType: DocumentType.PASSPORT,
            disableExpiryValidation: true,
            forceUpload: false,
            enableAgeVerification: 18,
          },
        ],
        face: {
          enableFacialRecognition: true,
          enrollFace: false,
          maxAttempts: 3,
        },
        returnDataForIncompleteSession: true,
        onError: function (error) {
          console.debug(
            "error from callback function  message: ",
            error.message,
            " data: ",
            error.data
          );
        },
        onSuccess: function (res) {
          console.debug("result from callback function ", res);
        },
      }).then(function (res) {
        console.debug("result from await function ", res);
      })
        .catch(function (error) {
          console.debug(
            "error from try catch  message: ",
            error.message,
            " data: ",
            error.data
          );
        })
    }
```

Create the HTML codes that render the "Enroll Passport" button.
When this button is clicked, it triggers the enrollmentPassport function.

```javascript
  <div class="uq-container-example" id="uq_container">
    <h3>Uqudo Web SDK Example</h3>
    <button id="uq-enrollment-passport-button" class="uq-passport-button"
      onClick="enrollmentPassport()">
      Enroll Passport
    </button>
  </div>
```

## Notes

- Customize the project according to your needs, and refer to the [official Uqudo SDK documentation](http://docs.uqudo.com/docs/) for more details and configurations.
