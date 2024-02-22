import { POBRequest } from '../../models/POBRequest';

test('testRequestCreation', () => {
  let request = new POBRequest();
  request.serverUrl = 'https://serverurl.com';
  request.bidSummary = true;
  request.networkTimeout = 10;
  request.debugEnabled = false;
  request.versionId = 1;
  request.testMode = true;
  expect(request.serverUrl).toBe('https://serverurl.com');
  expect(request.bidSummary).toBeTruthy();
  expect(request.networkTimeout).toBe(10);
  expect(request.debugEnabled).toBeFalsy();
  expect(request.versionId).toBe(1);
  expect(request.testMode).toBeTruthy();
});

test('testRequestCreation with null values', () => {
  let request = new POBRequest();
  request.bidSummary = true;
  request.networkTimeout = 10;
  request.versionId = 1;
  expect(request.serverUrl).toBeUndefined();
  expect(request.bidSummary).toBeTruthy();
  expect(request.networkTimeout).toBe(10);
  expect(request.debugEnabled).toBeUndefined();
  expect(request.versionId).toBe(1);
  expect(request.testMode).toBeUndefined();
});
