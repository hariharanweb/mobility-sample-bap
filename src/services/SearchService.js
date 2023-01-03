import * as dotenv from "dotenv";
import Api from "../api/Api";
import MessageRespository from "../repo/MessageRespository";
import ContextBuilder from "../utilities/ContextBuilder";
import LoggingService from "./LoggingService";
import crypto from "crypto";

dotenv.config();

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
});

const search = async (message) => {
  const logger = LoggingService.getLogger("SearchService");
  logger.debug(`Search called with ${JSON.stringify(message)}`);
  const context = ContextBuilder.getContext("search");

  const searchRequest = {
    context,
    message,
  };

  const url = `${process.env.GATEWAY_URL}/search`;
  const response = await Api.doPost(url, JSON.stringify(searchRequest));
  const responseText = await response.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

const storeSearchResult = (response) => {
  MessageRespository.storeResult(response);
};

const getSearchResult = (messageId) => MessageRespository.getResult(messageId);

export default {
  search,
  getSearchResult,
  storeSearchResult,
};
