import { POBInterstitialListener } from '../../ads/POBInterstitialListener';
import { POBInterstitial } from '../../ads/POBInterstitial';

import { POBError } from '../../models/POBError';
import { POBConstants } from '../../common/POBConstants';

var isCalled: number;
var actPubId: string;
var actInstanceId: string;
var actProfileId: number;
var actAdUnitId: string;

jest.mock('react-native', () => {
    return {
        NativeModules: {
            POBRNInterstitialModule: {
                createAdInstance(instanceId: string, publisherId: string, profileId: number, adUnitId: string) {
                    isCalled = 1;
                    actInstanceId = instanceId;
                    actPubId = publisherId;
                    actProfileId = profileId;
                    actAdUnitId = adUnitId;
                },
                loadAd(instanceId: string) {
                    actInstanceId = instanceId;
                    isCalled = 2;
                },
                showAd(instanceId: string) {
                    actInstanceId = instanceId;
                    isCalled = 3;
                },
                destroy(instanceId: string) {
                    actInstanceId = instanceId;
                    isCalled = 4;
                },
                isReady(instanceId: string) {
                    actInstanceId = instanceId;
                    isCalled = 5;
                }
            },
        },
        NativeEventEmitter: jest.fn().mockImplementation(() => ({
            addListener: jest.fn(),
        })),
    };
});

describe('POBInterstitial', () => {
    const publisherId = '123456';
    const profileId = 123;
    const adUnitId = 'adUnitId';
    var isEventCalled: number;

    let instance: POBInterstitial;

    beforeEach(() => {
        instance = new POBInterstitial(publisherId, profileId, adUnitId);
        instance.setListener(new class extends POBInterstitialListener {
            onAdReceived(ad: POBInterstitial): void {
                isEventCalled = 1;
            }
            onAdFailedToLoad(ad: POBInterstitial, error: POBError): void {
                isEventCalled = 2;
            }
            onAdFailedToShow(ad: POBInterstitial, error: POBError): void {
                isEventCalled = 3;
            }
            onAdClicked(ad: POBInterstitial): void {
                isEventCalled = 4;
            }
            onAdOpened(ad: POBInterstitial): void {
                isEventCalled = 5;
            }
            onAdClosed(ad: POBInterstitial): void {
                isEventCalled = 6;
            }
            onAdExpired(ad: POBInterstitial): void {
                isEventCalled = 7;
            }
            onAppLeaving(ad: POBInterstitial): void {
                isEventCalled = 8;
            }
        })
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('testCreateInstance', () => {
        expect(instance).toBeInstanceOf(POBInterstitial);
        expect(1).toBe(isCalled);
        expect(publisherId).toBe(actPubId);
        expect(profileId).toBe(actProfileId);
        expect(adUnitId).toBe(actAdUnitId);
    });

    it('testLoadAd', () => {
        instance.loadAd();
        expect(2).toBe(isCalled);
    });

    it('testShowAd', () => {
        instance.show();
        expect(3).toBe(isCalled);
    });

    it('testDestroy', () => {
        instance.destroy();
        expect(4).toBe(isCalled);
    });

    it('testIsReceiveEvent', () => {
        instance.onAdEvent(POBConstants.AD_RECEIVED_EVENT, "");
        expect(1).toBe(isEventCalled);
        var errorInfoJSON: string = JSON.stringify({
            errorCode: "ABC123",
            errorMessage: "testLoad"
        });
        instance.onAdEvent(POBConstants.AD_FAILED_TO_LOAD_EVENT, errorInfoJSON);
        expect(2).toBe(isEventCalled);
        errorInfoJSON = JSON.stringify({
            errorCode: "123ABC",
            errorMessage: "testShow"
        });
        instance.onAdEvent(POBConstants.AD_FAILED_TO_SHOW_EVENT, errorInfoJSON);
        expect(3).toBe(isEventCalled);
        instance.onAdEvent(POBConstants.AD_CLICKED_EVENT, "");
        expect(4).toBe(isEventCalled);
        instance.onAdEvent(POBConstants.AD_OPEN_EVENT, "");
        expect(5).toBe(isEventCalled);
        instance.onAdEvent(POBConstants.AD_CLOSE_EVENT, "");
        expect(6).toBe(isEventCalled);
        instance.onAdEvent(POBConstants.AD_EXPIRED_EVENT, "");
        expect(7).toBe(isEventCalled);
        instance.onAdEvent(POBConstants.APP_LEAVE_EVENT, "");
        expect(8).toBe(isEventCalled);
    });

});
