import { PERMISSIONS } from 'react-native-permissions';

export default {
  // Permissions required by the OW-SDK.
  PERMISSIONS: [
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.ANDROID.READ_PHONE_STATE,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ],
  // Number of items in the list.
  ITEMS_IN_LIST: 30,
  // Interval between the ads in the list.
  AD_SLOT_SIZE: 4,
  // For test IDs refer - https://help.pubmatic.com/openwrap/docs/test-and-debug-your-integration-6
  PUBLISHER_ID: '156276',
  DISPLAY_PROFILE_ID: 1165,
  VIDEO_PROFILE_ID: 1757,
  BANNER_AD_UNIT_ID: 'OpenWrapBannerAdUnit',
  INTERSTITIAL_AD_UNIT_ID: 'OpenWrapInterstitialAdUnit',
  REWARDED_AD_UNIT_ID: 'OpenWrapRewardedAdUnit',
  // Ad formates for primary ad server integration.
  PRIMARY_AD_FORMATS: [
    'Banner',
    'MREC Display',
    'MREC Video',
    'Interstitial Display',
    'Interstitial Video',
    'Rewarded',
    'Banner List',
  ],
  // Ad formats for in house mediation i.e. Get Bid Price feature integration.
  IN_HOUSE_MEDIATION_AD_FORMATS: ['Banner', 'Interstitial', 'Rewarded'],
  // Integration types supported.
  INTERGRATION_TYPE: ['Primary Ad SDK', 'In House Mediation'],
  BID_LOST_ERROR_MESSAGE: "Bid lost client side auction. Hence proceeding with error.",
  BID_EXPIRED_ERROR_MESSAGE: "Bid has expired.",
  BID_EXPIRY_CHECK_UNKNOWN_ERROR: "Unknown error occurred while checking bid expiry.",
};
