import { POBApplicationInfo } from '../../models/POBApplicationInfo';

test('testCreateApplicationInfo', () => {
  var applicationInfo: POBApplicationInfo = new POBApplicationInfo();
  var url: URL = new URL('http://www.google.com');
  applicationInfo.setStoreURL(url);
  applicationInfo.setKeywords('keywords');
  applicationInfo.setCategories('iab');
  applicationInfo.setDomain('domain');
  applicationInfo.setPaid(true);

  expect(applicationInfo.storeUrl).toBe(url);
  expect(applicationInfo.keywords).toBe('keywords');
  expect(applicationInfo.categories).toBe('iab');
  expect(applicationInfo.domain).toBe('domain');
  expect(applicationInfo.paid).toBe(true);
});
