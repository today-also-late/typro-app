import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// APIを叩いたときに返すresponse
const sendResponse = (
  response: functions.Response,
  statusCode: number,
  body: any
) =>
  response.send({
    statusCode,
    body: JSON.stringify(body),
  });

export const addQuestions = functions.https.onRequest(
  async (req: any, res: any) => {
    if (req.method !== "POST") {
      sendResponse(res, 405, { error: "invalid Request!" });
    } else {
      const dataset = req.body;
      for (const key of Object.keys(dataset)) {
        const data = dataset[key];
        await db.collection("questions").doc(key).set(data);
      }
      sendResponse(res, 200, { message: "Successfully!!" });
    }
  }
);
