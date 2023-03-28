import LoggingService from '../services/LoggingService';
import TrackService from '../services/TrackService';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';

const onTrack = async (req, res) => {
  const logger = LoggingService.getLogger('onTrackController');
  logger.debug(`on_track called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.context.bpp_id);
  const publicKey = await LookUpService.getPublicKeyWithSubscriberId(req.body.context.bpp_id);
  try {
    await authVerifier.authorize(req, publicKey);
    logger.debug('Request Authorized Successfully.');
    TrackService.storeTrackResult(req.body);
    genericResponse.sendAcknowledgement(res);
  } catch (error) {
    logger.error(`Authorization Failed ${error}`);
    genericResponse.sendErrorWithAuthorization(res);
  }
};

export default {
  onTrack,
};
