import StatusService from '../services/StatusService';

const status = async (req, res) => {
  const context = await StatusService.status(req.body);
  res.send(context);
};

const statusResult = (req, res) => {
  const statusResponse = StatusService.getStatusResult(req.query.message_id);
  if (statusResponse) {
    res.send(statusResponse);
  } else {
    res.send([]);
  }
};

export default {
  status,
  statusResult,
};
