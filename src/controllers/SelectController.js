import SelectService from '../services/SelectService';

const select = async (req, res) => {
  const context = await SelectService.select(req.body);
  res.send(context);
};

const selectResult = (req, res) => {
  const selectResponse = SelectService.getSelectResult(req.query.message_id);
  if (selectResponse) {
    res.send(selectResponse);
  } else {
    res.send([]);
  }
};

export default {
  select,
  selectResult,
};
