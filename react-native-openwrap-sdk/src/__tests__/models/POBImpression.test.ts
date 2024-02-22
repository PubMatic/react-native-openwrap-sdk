import { POBImpression } from '../../models/POBImpression';

test('testImpressionCreation', () => {
  let impression = new POBImpression();
  impression.adPosition = POBImpression.POBAdPosition.aboveTheFold;
  impression.customParameters = new Map();
  impression.testCreativeId = 'creativeId';
  expect(impression.adPosition).toBe(POBImpression.POBAdPosition.aboveTheFold);
  expect(impression.testCreativeId).toBe('creativeId');
});

test('testRequestCreation with null values', () => {
  let impression = new POBImpression();
  impression.adPosition = POBImpression.POBAdPosition.footer;
  expect(impression.customParameters).toBeUndefined();
  expect(impression.testCreativeId).toBeUndefined();
  expect(impression.adPosition).toBe(POBImpression.POBAdPosition.footer);
});

test('test Json stringify', () => {
  const map = new Map();
  map.set('key', ['value']);
  let impression = new POBImpression();
  impression.customParameters = map;
  const impressionString = JSON.stringify(impression);
  expect(impressionString).toContain("key")
  expect(impressionString).toContain("value")
})

test('negative test cases for Json stringify', () => {
  const map = new Map();
  map.set('key', ['value']);
  map.set('key1', []);
  map.set('key2', null);
  map.set('key2', undefined);
  let impression = new POBImpression();
  impression.customParameters = map;
  const impressionString = JSON.stringify(impression);
  expect(impressionString).toContain("key")
  expect(impressionString).toContain("value")
})