import express from 'express';
import OnSearchController from './controllers/OnSearchController';
import OnSelectController from './controllers/OnSelectController';
import SearchController from './controllers/SearchController';
import SelectController from './controllers/SelectController';
import LoggingService from './services/LoggingService';

const app = express();
const logger = LoggingService.getLogger('App');
const port = process.env.BUYER_APP_PORT ? process.env.BUYER_APP_PORT : 2010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Sample BAP is running ${new Date()}`);
});

app.post('/search', SearchController.search);
app.get('/search', SearchController.searchResult);
app.post('/on_search', OnSearchController.onSearch);

app.post('/select', SelectController.select);
app.post('/on_select', OnSelectController.onSelect);
app.get('/select', SelectController.selectResult);

app.listen(port, () => {
  logger.info(`Sample BAP listening on port ${port}`);
});
