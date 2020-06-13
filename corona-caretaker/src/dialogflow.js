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
