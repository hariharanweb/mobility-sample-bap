import SearchService from '../services/SearchService';

const search = async (req, res) => {
  const context = await SearchService.search(req.body);
  res.send(context);
};

export default {
  search,
};
