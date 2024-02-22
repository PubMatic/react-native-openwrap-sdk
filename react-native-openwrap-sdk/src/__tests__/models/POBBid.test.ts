import { POBBidHandler } from '../../models/POBBidHandler';
import { POBBid } from '../../models/POBBid';

class DummyTestAdClass implements POBBidHandler {
  isBidExpired(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }
}

const dummyTestAdInstance = new DummyTestAdClass();

test('testBidCreation', () => {
  let bid = new POBBid({
    crType: 'banner',
    height: 320,
    width: 50,
    partnerName: 'partner',
    price: 1.0,
    targeting: {
      target: '1',
    },
    bidId: '123',
    bundle: 'com.package',
    creative: 'banner',
    creativeId: '123',
    dealId: '234',
    grossPrice: 20,
    impressionId: '123',
    lurl: 'https://google.com',
    nurl: 'https://google.com',
    refreshInterval: 60,
    rewardAmount: 10,
    rewardCurrencyType: 'coinds',
    status: POBBid.BID_STATUS_OK,
  }, dummyTestAdInstance);
  expect(bid.crType).toBe('banner');
  expect(bid.height).toBe(320);
  expect(bid.width).toBe(50);
  expect(bid.partnerName).toBe('partner');
  expect(bid.price).toBe(1.0);
  expect(bid.targeting).toBeDefined();
  expect(bid.targeting?.get('target')).toBe('1');
  expect(bid.bidId).toBe('123');
  expect(bid.bundle).toBe('com.package');
  expect(bid.creative).toBe('banner');
  expect(bid.creativeId).toBe('123');
  expect(bid.dealId).toBe('234');
  expect(bid.grossPrice).toBe(20);
  expect(bid.impressionId).toBe('123');
  expect(bid.lurl).toBe('https://google.com');
  expect(bid.nurl).toBe('https://google.com');
  expect(bid.refreshInterval).toBe(60);
  expect(bid.reward).toBeDefined();
  expect(bid.reward?.amount).toBe(10);
  expect(bid.reward?.currencyType).toBe('coinds');
  expect(bid.status).toBe(POBBid.BID_STATUS_OK);
});

test('testBidCreationWithNullValues', () => {
  let bid = new POBBid({
    crType: undefined,
    height: 320,
    width: 320,
    partnerName: 'partner',
    price: 1.0,
    targeting: undefined,
    bidId: undefined,
    bundle: 'com.package',
    creative: undefined,
    creativeId: '123',
    dealId: undefined,
    grossPrice: 20,
    impressionId: undefined,
    lurl: 'https://google.com',
    nurl: 'https://google.com',
    refreshInterval: 60,
    rewardAmount: undefined,
    rewardCurrencyType: 'coinds',
    status: POBBid.BID_STATUS_NOT_OK,
  }, dummyTestAdInstance);
  expect(bid.crType).toBeUndefined();
  expect(bid.height).toBe(320);
  expect(bid.width).toBe(320);
  expect(bid.partnerName).toBe('partner');
  expect(bid.price).toBe(1.0);
  expect(bid.targeting).toBeUndefined();
  expect(bid.bidId).toBeUndefined();
  expect(bid.bundle).toBe('com.package');
  expect(bid.creative).toBeUndefined();
  expect(bid.creativeId).toBe('123');
  expect(bid.dealId).toBeUndefined();
  expect(bid.grossPrice).toBe(20);
  expect(bid.impressionId).toBeUndefined();
  expect(bid.lurl).toBe('https://google.com');
  expect(bid.nurl).toBe('https://google.com');
  expect(bid.refreshInterval).toBe(60);
  expect(bid.reward).toBeUndefined();
  expect(bid.status).toBe(POBBid.BID_STATUS_NOT_OK);
});
