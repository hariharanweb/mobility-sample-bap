import SearchService from '../services/SearchService';

const search = async (req, res) => {
  const context = await SearchService.search(req.body);
  res.send(context);
};

const searchResult = (req, res) => {
  const searchResponse = SearchService.getSearchResult(req.query.message_id);
  if (searchResponse) {
    res.send(searchResponse);
  } else {
    res.send([]);
  }
};

export default {
  search,
  searchResult,
};
