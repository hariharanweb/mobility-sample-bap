import SelectService from '../services/SelectService';

const select = async (req, res) => {
  const context = await SelectService.select(req.body);
  res.send(context);
};

export default {
  select,
};
