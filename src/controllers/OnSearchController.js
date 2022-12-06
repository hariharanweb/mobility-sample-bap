import log4js from 'log4js';

const onSearch = (req, res) => {
  const logger = log4js.getLogger('OnSearchController');
  logger.debug(`on_search called with ${JSON.stringify(req.body)}`);
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
