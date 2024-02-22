import { POBAdUnitDetails } from '../../models/POBAdUnitDetails';
import { POBAdSize } from '../../models/POBAdSize';
import { POBRequest } from '../..//models/POBRequest';
import { POBImpression } from '../../models/POBImpression';
describe('POBAdDetails', () => {
  test('test case for verification of POBAdDetails interface/object details', () => {
    const customParam = new Map<string, string[]>();
    customParam.set('key', ['value']);
    const request = new POBRequest();
    request.testMode = true;
    request.bidSummary = true;
    request.serverUrl = 'https://serverurl.com';
    request.versionId = 1;
    request.networkTimeout = 100;
    request.debugEnabled = false;
    const impression = new POBImpression();
    impression.testCreativeId = 'cre';
    impression.customParameters = customParam;
    impression.adPosition = POBImpression.POBAdPosition.footer;

    const adDetails: POBAdUnitDetails = {
      publisherId: 'testPublisherId',
      profileId: 1165,
      adUnitId: 'testAdUnitId',
      adSizes: [POBAdSize.BANNER_SIZE_320x50, POBAdSize.BANNER_SIZE_300x250],
      request: request,
      impression: impression,
    };
    expect('testPublisherId').toBe(adDetails.publisherId);
    expect(1165).toBe(adDetails.profileId);
    expect('testAdUnitId').toBe(adDetails.adUnitId);
    expect(2).toEqual(adDetails.adSizes.length);
    expect(POBAdSize.BANNER_SIZE_320x50).toEqual(adDetails.adSizes[0]);
    expect(POBAdSize.BANNER_SIZE_300x250).toEqual(adDetails.adSizes[1]);
    expect(adDetails.request).toBeDefined();
    expect(adDetails.request!.bidSummary).toBeTruthy();
    expect(adDetails.request!.testMode).toBeTruthy();
    expect(adDetails.request!.serverUrl).toBe('https://serverurl.com');
    expect(adDetails.request!.versionId).toBe(1);
    expect(adDetails.request!.networkTimeout).toBe(100);
    expect(adDetails.request!.debugEnabled).toBeFalsy();
  });

  test('Test case for verification of empty POBAdDetails interface/object details', () => {
    const adDetails: POBAdUnitDetails = {
      publisherId: '',
      profileId: 0,
      adUnitId: '',
      adSizes: [],
    };
    expect('').toBe(adDetails.publisherId);
    expect(0).toBe(adDetails.profileId);
    expect('').toBe(adDetails.adUnitId);
    expect(0).toEqual(adDetails.adSizes.length);
    expect(adDetails.request).toBeUndefined();
    expect(adDetails.impression).toBeUndefined();
  });
});
