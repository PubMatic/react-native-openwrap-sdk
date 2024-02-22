import { OpenWrapSDK } from '../OpenWrapSDK';
import { POBApplicationInfo } from '../models/POBApplicationInfo';
import { POBLocation } from '../models/POBLocation';
import { POBUserInfo } from '../models/POBUserInfo';
var actualLogLevel: OpenWrapSDK.LogLevel;
var actualAllowLocationAccess: Boolean;
var actualCoppa: boolean;
var actualSSLEnabled: boolean;
var actualUseInternalBrowser: boolean;
var actualAllowAdvertisingId: boolean;
var actualUserInfo: string | null;
var actualApplicationInfo: string | null;
var actualLocation: string | null;
var actualAudioSessionEnabled: boolean;
// Mock the OpenWrapSDKModule NativeModule and Platform for making it available for test cases.
jest.mock('react-native', () => {
  return {
    NativeModules: {
      OpenWrapSDKModule: {
        getConstants: jest.fn(() => ({
          ow_sdk_version: '3.4.0',
        })),

        setLogLevel(logLevel: OpenWrapSDK.LogLevel) {
          actualLogLevel = logLevel;
        },

        allowLocationAccess(allowLocationAccess: boolean) {
          actualAllowLocationAccess = allowLocationAccess;
        },

        setCoppa(coppa: boolean) {
          actualCoppa = coppa;
        },

        setSSLEnabled(sslEnabled: boolean) {
          actualSSLEnabled = sslEnabled;
        },

        setUseInternalBrowser(useInternalBrowser: boolean) {
          actualUseInternalBrowser = useInternalBrowser;
        },

        allowAdvertisingId(allowAdvertisingId: boolean) {
          actualAllowAdvertisingId = allowAdvertisingId;
        },

        setApplicationInfo(applicationInfo: string) {
          actualApplicationInfo = applicationInfo;
        },

        setLocation(location: string) {
          actualLocation = location;
        },

        allowAVAudioSessionAccess(allowAdvertisingId: boolean) {
          actualAudioSessionEnabled = allowAdvertisingId;
        },

        setUserInfo(userInfo: string) {
          actualUserInfo = userInfo;
        },
      },
    },
    Platform: {
      OS: 'ios', // Mocked platform value
      select() {
        return 'ios';
      },
    },
  };
});

test('testSDKVersion', () => {
  expect(OpenWrapSDK.getVersion()).toBe('3.4.0');
});

test('testLogLevel', () => {
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.All);
  expect(OpenWrapSDK.LogLevel.All).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Debug);
  expect(OpenWrapSDK.LogLevel.Debug).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Error);
  expect(OpenWrapSDK.LogLevel.Error).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Info);
  expect(OpenWrapSDK.LogLevel.Info).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Off);
  expect(OpenWrapSDK.LogLevel.Off).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Warn);
  expect(OpenWrapSDK.LogLevel.Warn).toBe(actualLogLevel);
  OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.Verbose);
  expect(OpenWrapSDK.LogLevel.Verbose).toBe(actualLogLevel);
});

test('testAllowLocationAccess', () => {
  OpenWrapSDK.allowLocationAccess(true);
  expect(true).toBe(actualAllowLocationAccess);
  OpenWrapSDK.allowLocationAccess(false);
  expect(false).toBe(actualAllowLocationAccess);
});

test('setCoppa', () => {
  OpenWrapSDK.setCoppa(false);
  expect(false).toBe(actualCoppa);
  OpenWrapSDK.setCoppa(true);
  expect(true).toBe(actualCoppa);
});

test('setSSLEnabled', () => {
  OpenWrapSDK.setSSLEnabled(true);
  expect(true).toBe(actualSSLEnabled);
  OpenWrapSDK.setSSLEnabled(false);
  expect(false).toBe(actualSSLEnabled);
});

test('setUseInternalBrowser', () => {
  OpenWrapSDK.setUseInternalBrowser(true);
  expect(true).toBe(actualUseInternalBrowser);
  OpenWrapSDK.setUseInternalBrowser(false);
  expect(false).toBe(actualUseInternalBrowser);
});

test('allowAdvertisingId', () => {
  OpenWrapSDK.allowAdvertisingId(true);
  expect(true).toBe(actualAllowAdvertisingId);
  OpenWrapSDK.allowAdvertisingId(false);
  expect(false).toBe(actualAllowAdvertisingId);
});

test('setApplicationInfo', () => {
  let applicationInfo = new POBApplicationInfo();
  let url: URL = new URL('http://www.google.com');
  applicationInfo.setStoreURL(url);
  applicationInfo.setKeywords('keywords');
  applicationInfo.setCategories('iab');
  applicationInfo.setDomain('domain');
  applicationInfo.setPaid(true);
  OpenWrapSDK.setApplicationInfo(applicationInfo);
  let expectedApplicationInfo: string = JSON.stringify(applicationInfo);
  expect(actualApplicationInfo).toEqual(expectedApplicationInfo);
});

test('setLocation', () => {
  let location: POBLocation = new POBLocation(
    POBLocation.Source.GPS,
    11.0,
    122.0
  );
  OpenWrapSDK.setLocation(location);
  let expectedLocation: string = JSON.stringify(location);
  expect(actualLocation).toEqual(expectedLocation);
});

test('allowAVAudioSessionAccess', () => {
  OpenWrapSDK.allowAVAudioSessionAccess(true);
  expect(true).toBe(actualAudioSessionEnabled);
  OpenWrapSDK.allowAVAudioSessionAccess(false);
  expect(false).toBe(actualAudioSessionEnabled);
});

test('setUserInfo', () => {
  let userInfo = new POBUserInfo();
  userInfo.setBirthYear(2020);
  userInfo.setKeywords('keywords');
  userInfo.setGender(POBUserInfo.Gender.FEMALE);
  userInfo.setCity('Pune');
  userInfo.setMetro('metro');
  userInfo.setRegion('region');
  userInfo.setZip('zip');
  OpenWrapSDK.setUserInfo(userInfo);
  let expectedUserInfo: string = JSON.stringify(userInfo);
  expect(actualUserInfo).toEqual(expectedUserInfo);
});
