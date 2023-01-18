import LoggingService from '../services/LoggingService';
import genericResponse from '../utilities/GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import LookUpService from '../services/LookUpService';
import ConfirmService from '../services/ConfirmService';

const onConfirm = async (req, res) => {
  const logger = LoggingService.getLogger('OnConfirmController');
  logger.debug(`on_confirm called with ${JSON.stringify(req.body)}`);
  logger.debug(req.body.message.order.provider.id);
  const publicKey = await LookUpService.getPublicKeyWithUkId(req.body.message.order.provider.id);
  authVerifier.authorize(req, publicKey).then(() => {
    logger.debug('Request Authorized Successfully.');
    ConfirmService.storeConfirmResult(req.body);
    genericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.error(`Authorization Failed ${err}`);
    genericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onConfirm,
};
