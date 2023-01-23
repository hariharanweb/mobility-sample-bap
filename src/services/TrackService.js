import * as dotenv from 'dotenv';
import Api from '../api/Api';
import ContextBuilder from '../utilities/ContextBuilder';
import LoggingService from './LoggingService';
import MessageRespository from '../repo/MessageRespository';

dotenv.config();

const track = async (trackRequest) => {
  const logger = LoggingService.getLogger('TrackService');
  const context = ContextBuilder.getContext('track');
  const { message } = trackRequest;
  const trackPayload = {
    context,
    message,
  };
  const url = `${trackRequest.context.bpp_uri}/track`;
  logger.debug(`Track Pay Load ${trackPayload}`);

  const trackResponse = await Api.doPost(url, JSON.stringify(trackPayload));
  const responseText = await trackResponse.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

const storeTrackResult = (response) => {
  MessageRespository.storeResult(response);
};

const getTrackResult = (messageId) => MessageRespository.getResult(messageId);

export default {
  track,
  storeTrackResult,
  getTrackResult,
};
