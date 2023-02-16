import express from 'express';
import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import ConfirmController from './controllers/ConfirmController';
import OnConfirmController from './controllers/OnConfirmController';
import OnSearchController from './controllers/OnSearchController';
import OnSelectController from './controllers/OnSelectController';
import SearchController from './controllers/SearchController';
import SelectController from './controllers/SelectController';
import LoggingService from './services/LoggingService';
import InitController from './controllers/InitController';
import OnInitController from './controllers/OnInitController';
import StatusController from './controllers/StatusController';
import OnStatusController from './controllers/OnStatusController';
import TrackController from './controllers/TrackController';
import OnTrackController from './controllers/OnTrackController';
import SubscribeController from './controllers/SubscribeController';
import OnSubscribeController from './controllers/OnSubscribeController';
import SignatureHelper from './utilities/SignVerify/SignatureHelper';

dotenv.config();
process.env.REQUEST_ID = uuid();

const app = express();
const logger = LoggingService.getLogger('App');
const port = process.env.BUYER_APP_PORT ? process.env.BUYER_APP_PORT : 2010;

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(dirname, 'views'));
app.use(express.static(path.join(dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`Sample BAP is running ${new Date()}`);
});

app.post('/search', SearchController.search);
app.get('/search', SearchController.searchResult);
app.post('/on_search', OnSearchController.onSearch);

app.post('/select', SelectController.select);
app.post('/on_select', OnSelectController.onSelect);
app.get('/select', SelectController.selectResult);

app.post('/confirm', ConfirmController.confirm);
app.post('/on_confirm', OnConfirmController.onConfirm);
app.get('/confirm', ConfirmController.confirmResult);

app.post('/init', InitController.init);
app.post('/on_init', OnInitController.onInit);
app.get('/init', InitController.initResult);

app.post('/status', StatusController.status);
app.post('/on_status', OnStatusController.onStatus);
app.get('/status', StatusController.statusResult);

app.post('/track', TrackController.track);
app.post('/on_track', OnTrackController.onTrack);
app.get('/track', TrackController.trackResult);

app.post('/subscribe', SubscribeController.subscribe);
app.post('/on_subscribe', OnSubscribeController.onSubscribe);

const registerVerificationPage = async (application) => {
  application.get('/ondc-site-verification.html', async (req, res) => {
    const signedRequestId = await SignatureHelper.createSignedData(
      process.env.REQUEST_ID,
      process.env.PRIVATE_KEY,
    );
    res.status(200).render('ondc-site-verification', {
      SIGNED_UNIQUE_REQ_ID: signedRequestId,
    });
  });
};

app.listen(port, async () => {
  logger.info(`Sample BAP listening on port ${port}`);

  await registerVerificationPage(app);
});
