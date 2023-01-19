import LoggingService from '../services/LoggingService';
import InitServices from '../services/InitServices';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';

const onInit = async (req, res) => {
  const logger = LoggingService.getLogger('OnInitController');
  logger.debug(`on_init called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.message.order.provider.id);
  const publicKey = await LookUpService.getPublicKeyWithUkId(req.body.message.order.provider.id);
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    InitServices.storeInitResult(req.body);
    genericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.error(`Authorization Failed ${err}`);
    genericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onInit,
};
