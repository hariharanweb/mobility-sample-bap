import fetch from "node-fetch";
import LoggingService from "../services/LoggingService";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const doPost = (url, body) => {
  const logger = LoggingService.getLogger("API");
  logger.debug(`Posting to ${url} with Content ${JSON.stringify(body)}`);

  const identity = {};
  const signingString = createSigningString(body);

  const privateKey = fs.readFileSync(
    path.resolve("./src/api/CertificateBAP/privateKey.txt"),
    "utf-8"
  );

  const signature = crypto.sign(null, Buffer.from(signingString), privateKey);

  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "X-Gateway-Authorization": signature.toString("base64"),
      "Content-Type": "application/json",
    },
  });
};

const createSigningString=(body)=>{
  return JSON.stringify(body);
}

export default {
  doPost,
};
