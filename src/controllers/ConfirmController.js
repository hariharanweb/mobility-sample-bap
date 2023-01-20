import ConfirmService from '../services/ConfirmService';

const confirm = async (req, res) => {
  const context = await ConfirmService.confirm(req.body);
  res.send(context);
};

const confirmResult = (req, res) => {
  const confirmResponse = ConfirmService.getConfirmResult(req.query.message_id);
  if (confirmResponse) {
    res.send(confirmResponse);
  } else {
    res.send([]);
  }
};

export default {
  confirm,
  confirmResult,
};
