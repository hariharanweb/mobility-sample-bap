import TrackService from '../services/TrackService';

const track = async (req, res) => {
  const context = await TrackService.track(req.body);
  res.send(context);
};

const trackResult = (req, res) => {
  const trackResponse = TrackService.getTrackResult(req.query.message_id);
  if (trackResponse) {
    res.send(trackResponse);
  } else {
    res.send([]);
  }
};

export default {
  track,
  trackResult,
};
