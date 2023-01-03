import LoggingService from '../services/LoggingService';
import SearchService from '../services/SearchService';
import authVerifier from '../utilities/AuthHeaderVerifier';
import genericResponse from './GenericResponse';

const BecknGateway = 'BG';
const onSearch = (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);

  authVerifier.authorize(req, 'BG').then(() => {
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
