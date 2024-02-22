import { POBAdSize } from './POBAdSize';
import { POBImpression } from './POBImpression';
import { POBRequest } from './POBRequest';
/**
 * Ad Details comprise of OpenWrap SDK Publisher Id, Profile Id, AdUnit Id, POBAdSizes, POBRequest and POBImpression
 */
export interface POBAdUnitDetails {
  publisherId: string;
  profileId: number;
  adUnitId: string;
  adSizes: POBAdSize[];
  request?: POBRequest;
  impression?: POBImpression;
  enableGetBidPrice?: number;
}
