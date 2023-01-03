import LoggingService from '../services/LoggingService';
import SearchService from '../services/SearchService';
import genericResponse from './GenericResponse';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';

const BecknGateway = 'BG';
const onSearch = (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);

  authVerifier.authorize(req, BecknGateway).then(() => {
    SearchService.storeSearchResult(req.body);
    genericResponse.sendAcknowledgement(res);
  }).catch((err) => {
    logger.error(`Authorization Failed ${err}`);
    genericResponse.sendErrorWithAuthorization(res);
  });
};

export default {
  onSearch,
};
