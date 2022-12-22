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
  console.log("The signature is " + signature);

  const header = createAuthorizationHeader(signature.toString("base64"));
  console.log(typeof(header));

  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "X-Gateway-Authorization": header,
      "Content-Type": "application/json",
    },
  });
};

const createSigningString=(body)=>{
  return JSON.stringify(body);
}

//-------------------------

const createAuthorizationHeader = (signature) => {
  const created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString(); //TO USE IN CASE OF TIME ISSUE
  const expires = (parseInt(created) + 1 * 60 * 60).toString(); //Add required time to create expired

  const header = `Signature keyId="1001|UUID|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
  console.log(header);
  return header;
};

//--------------

export default {
  doPost,
};
