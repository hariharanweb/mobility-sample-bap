import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import TrackService from '../services/TrackService';
import TrackController from './TrackController';

beforeEach(() => {
  TrackService.track = vi.fn();
  TrackService.getTrackResult = vi.fn();
});

const request = {
  context: {
    domain: 'nic2004:60221',
    country: 'IND',
    city: 'std:080',
    action: 'search',
    core_version: '1.0.0',
    bap_id: 'sample_mobility_bap',
    bap_uri: 'http://localhost:2010',
    transaction_id: 'd6f43bc3-3daf-4eca-9cde-54ae0c15a1fe',
    message_id: 'c39c712c-01ed-43e7-82cc-8ab08740b559',
    timestamp: '2023-02-02T10:46:23+05:30',
  },
  message: {
    intent: {
      fulfillment: {
        start: { location: { gps: '12.9372469,77.6109981' } },
        end: { location: { gps: '12.9702626,77.6099629' } },
      },
    },
  },
};

describe('Track Controller', () => {
  it('should test track service is called', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    await TrackController.track(request, res);
    expect(TrackService.track).toBeCalled();
  });

  it('should test whether the response is send', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    await TrackController.track(request, res);
    expect(res.send).toBeCalled();
  });

  it('should test whether the getTrackResult from trackService is called', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    const req = {
      query: {
        message_id: '1111',
      },
    };
    await TrackController.trackResult(req, res);
    expect(TrackService.getTrackResult).toBeCalled();
  });
});
