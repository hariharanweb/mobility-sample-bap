import LoggingService from '../services/LoggingService';
import TrackService from '../services/TrackService';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';

const onTrack = async (req, res) => {
  const logger = LoggingService.getLogger('onTrackController');
  logger.debug(`on_track called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.message.order.id);
  const publicKey = await LookUpService.getPublicKeyWithUkId(req.body.message.order.provider.id);
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    TrackService.storeTrackResult(req.body);
    genericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.error(`Authorization Failed ${err}`);
    genericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onTrack,
};
