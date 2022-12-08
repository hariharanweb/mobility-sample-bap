import express from 'express';
import log4js from 'log4js';
import OnSearchController from './controllers/OnSearchController';
import SearchController from './controllers/SearchController';
import SelectController from './controllers/SelectController';

const app = express();
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
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

app.listen(port, () => {
  logger.info(`Sample BAP listening on port ${port}`);
});
