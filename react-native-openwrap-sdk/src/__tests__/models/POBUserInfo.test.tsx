import { POBUserInfo } from '../../models/POBUserInfo';

test('testCreateUserInfo', () => {
  var userInfo: POBUserInfo = new POBUserInfo();
  userInfo.setBirthYear(2020);
  userInfo.setKeywords('keywords');
  userInfo.setGender(POBUserInfo.Gender.FEMALE);
  userInfo.setCity('Pune');
  userInfo.setMetro('metro');
  userInfo.setRegion('region');
  userInfo.setZip('zip');

  expect(userInfo.gender).toBe(POBUserInfo.Gender.FEMALE);
  expect(userInfo.birthYear).toBe(2020);
  expect(userInfo.keywords).toBe('keywords');
  expect(userInfo.city).toBe('Pune');
  expect(userInfo.metro).toBe('metro');
  expect(userInfo.region).toBe('region');
  expect(userInfo.zip).toBe('zip');
});

test('testGender', () => {
  expect(POBUserInfo.Gender.MALE).toBe(1);
  expect(POBUserInfo.Gender.FEMALE).toBe(2);
  expect(POBUserInfo.Gender.OTHER).toBe(0);
});
