import LoggingService from '../services/LoggingService';
import StatusServices from '../services/StatusService';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';

const onStatus = async (req, res) => {
  const logger = LoggingService.getLogger('OnStatusController');
  logger.debug(`on_status called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.context.bpp_id);
  const publicKey = await LookUpService.getPublicKeyWithSubscriberId(req.body.context.bpp_id);
  try {
    await authVerifier.authorize(req, publicKey);
    logger.debug('Request Authorized Successfully.');
    StatusServices.storeStatusResult(req.body);
    genericResponse.sendAcknowledgement(res);
  } catch (error) {
    logger.error(`Authorization Failed ${error}`);
    genericResponse.sendErrorWithAuthorization(res);
  }
};

export default {
  onStatus,
};
