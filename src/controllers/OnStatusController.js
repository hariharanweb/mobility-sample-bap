import LoggingService from '../services/LoggingService';
import StatusServices from '../services/StatusService';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';

const onStatus = async (req, res) => {
  const logger = LoggingService.getLogger('OnStatusController');
  logger.debug(`on_status called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.context.bpp_id);
  const publicKey = await LookUpService.getPublicKeyWithUkId(req.body.context.bpp_id);
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    // logger.debug(req.body.message.id);
    StatusServices.storeStatusResult(req.body);
    genericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.error(`Authorization Failed ${err}`);
    genericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onStatus,
};
