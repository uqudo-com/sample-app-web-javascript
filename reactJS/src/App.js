import uqudoSdkFactory, { DocumentType } from "uqudosdk-web";
import { useCallback } from "react";
import "./styles.css";

// TODO: Copy the Access token here
const UQUDO_ACCESS_TOKEN = "ACCESS_TOKEN";

const uqudoSdk = uqudoSdkFactory.create({
  accessToken: UQUDO_ACCESS_TOKEN,
});

function App() {
  const enrollmentPassport = useCallback(async () => {
    console.debug("enrollment start");
    try {
      const res = await uqudoSdk.enrollment({
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
        onError: (error) => {
          console.debug(
            "error from callback function  message: ",
            error.message,
            " data: ",
            error.data
          );
        },
        onSuccess: (res) => {
          console.debug("result from callback function ", res);
        },
      });
      console.debug("result from await function ", res);
    } catch (error) {
      console.debug(
        "error from try catch  message: ",
        error.message,
        " data: ",
        error.data
      );
    }
  }, []);

  return (
    <>
      <div className="uq-container-example" id="uq_container">
        <h3>Uqudo Web SDK Example</h3>
        <button class="uq-passport-button" onClick={enrollmentPassport}>
          Enroll Passport
        </button>
      </div>
    </>
  );
}

export default App;
