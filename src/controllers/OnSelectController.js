import LoggingService from '../services/LoggingService';
import SelectService from '../services/SelectService';

const onSelect = (req, res) => {
  const logger = LoggingService.getLogger('OnSelectController');
  logger.debug(`on_select called with ${JSON.stringify(req.body)}`);
  SelectService.storeSelectResult(req.body);
  res.send({
    message: {
      ack: {
        status: 'ACK',
      },
    },
  });
};

export default {
  onSelect,
};
