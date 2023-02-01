import SubscribeService from '../services/SubscribeService';

const subscribe = async (req, res) => {
  const context = await SubscribeService.subscribe(req.body);
  res.send(context);
};

export default {
  subscribe,
};
