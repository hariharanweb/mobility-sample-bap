import SearchService from '../services/SearchService';

const search = async (req, res) => {
  const context = await SearchService.search(req.body);
  res.send(context);
};

const searchResult = (req, res) => {
  res.send(SearchService.getSearchResult(req.query.message_id));
};

export default {
  search,
  searchResult,
};
