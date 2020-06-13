const dialogflow = require("dialogflow");
const uuid = require("uuid");

async function runSample(projectId = "1") {
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "Hello",
        languageCode: "en-US"
      }
    }
  };

  const responses = await sessionClient.detectIntent(request);
  console.log("Detected Intent");
  const result = responses[0].queryResult;
  console.log(` Query: ${result.queryText}`);
  console.log(` Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(` Intent: ${result.intent.displayName}`);
  } else {
    console.log(` No intent matched.`);
  }
}

(function(global) {
  "use strict";

  var CUSTOM_ELEMENTS_ADAPTER_URL =
    "https://static.dialogflow.com/common/messenger/webcomponentsjs/2.1.3/custom-elements-es5-adapter.js";
  var WEBCOMPONENTS_LOADER_URL =
    "https://static.dialogflow.com/common/messenger/webcomponentsjs/2.1.3/webcomponents-loader.js";
  var MESSENGER_URL =
    "https://www.gstatic.com/dialogflow-console/fast/messenger/messenger-internal.min.js?v=4";

  var loadDfMessenger = function() {
    var elementScript = document.createElement("script");
    elementScript.addEventListener("load", onMessengerLoaded, false);
    elementScript.src = MESSENGER_URL;
    global.document.body.insertBefore(elementScript, null);
  };

  var onMessengerLoaded = function() {
    window.dispatchEvent(new Event("dfMessengerLoaded"));
  };

  var loadWebComponentPolyfills = function() {
    var customElementsAdapterTag = document.createElement("script");
    if (global.customElements) {
      // Import custom elements adapter which is needed for Custom element
      // classes transpiled to ES5.
      customElementsAdapterTag.src = CUSTOM_ELEMENTS_ADAPTER_URL;
      document.head.appendChild(customElementsAdapterTag);
    }
    // Import web components loader which loads polyfills based on browser
    // support.
    const webComponentsLoaderTag = document.createElement("script");
    webComponentsLoaderTag.src = WEBCOMPONENTS_LOADER_URL;
    global.document.head.appendChild(webComponentsLoaderTag);
  };

  global.addEventListener("WebComponentsReady", loadDfMessenger, false);

  var raf =
    global.requestAnimationFrame ||
    global.mozRequestAnimationFrame ||
    global.webkitRequestAnimationFrame ||
    global.msRequestAnimationFrame;
  if (raf) {
    raf(function() {
      global.setTimeout(loadWebComponentPolyfills, 0);
    });
  } else {
    global.addEventListener("load", loadWebComponentPolyfills);
  }
})(window);
