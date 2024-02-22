import { POBAdManager } from '../../common/POBAdManager';
import { POBFullScreenAds } from '../../ads/POBFullScreenAds';
import { POBImpression } from '../../models/POBImpression';
import { POBRequest } from '../../models/POBRequest';
import { POBBid } from '../../models/POBBid';

jest.mock('react-native', () => {
    return {
        NativeModules: {
            POBRNInterstitialModule: {},
        },
        NativeEventEmitter: jest.fn().mockImplementation(() => ({
            addListener: jest.fn(),
        })),
    };
});

describe('POBAdManager', () => {
    let adManager: POBAdManager;
    const instanceId = 'testInstanceId';

    beforeEach(() => {
        adManager = POBAdManager.getInstance();
    });

    it('should create an instance of POBAdManager', () => {
        expect(adManager).toBeInstanceOf(POBAdManager);
    });

    it('should put and remove ads in the manager', () => {
        const ad = new MyPOBFullScreenAds();
        adManager.put(instanceId, ad);

        expect(adManager['instanceMap'].get(instanceId)).toBe(ad);

        adManager.remove(instanceId);
        expect(adManager['instanceMap'].has(instanceId)).toBe(false);
    });
});

class MyPOBFullScreenAds implements POBFullScreenAds {
    getBid(): POBBid | undefined {
        return undefined;
    }
    setRequest(request: POBRequest): void {
        
    }
    setImpression(impression: POBImpression): void {
        
    }
    isReady(): Promise<Boolean> {
        return new Promise(() => {});
    }
    loadAd(): void {

    }
    show(): void {

    }
    destroy(): void {

    }
    onAdEvent(eventName: string, adInfo: any): void {

    }
}
