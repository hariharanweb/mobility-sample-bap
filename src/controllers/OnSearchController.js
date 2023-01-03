import LoggingService from '../services/LoggingService';
import SearchService from '../services/SearchService';
import auth from '../utilities/auth';

const onSearch = (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);
  auth.authorize(req,'BG').then((x) => {
    SearchService.storeSearchResult(req.body);
    res.send({
      message: {
        ack: {
          status: 'ACK',
        },
      },
    });
  }).catch((err) => {
    logger.debug('On Rejected Promise of Authorize call');
    res.status(401).send('Error');
  });
};

export default {
  onSearch,
};
