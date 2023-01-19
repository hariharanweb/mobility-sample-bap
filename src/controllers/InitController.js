import InitServices from '../services/InitServices';

const init = async (req, res) => {
  const context = await InitServices.init(req.body);
  res.send(context);
};

const initResult = (req, res) => {
  const initResponse = InitServices.getInitResult(req.query.message_id);
  if (initResponse) {
    res.send(initResponse);
  } else {
    res.send([]);
  }
};

export default {
  init,
  initResult,
};
