import LoggingService from '../services/LoggingService';
import SearchService from '../services/SearchService';

const onSearch = (req, res) => {
  const logger = LoggingService.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);
  SearchService.storeSearchResult(req.body);
  res.send({
    message: {
      ack: {
        status: 'ACK',
      },
    },
  });
};

export default {
  onSearch,
};
