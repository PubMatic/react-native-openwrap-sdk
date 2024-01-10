import { AdSize } from "./AdSize";

/**
 * Model class which contains ad unit details details required to load an ad
 */
export interface POBAdUnitDetails {
  // OpenWrap SDK Publisher Id (mandatory)
  publisherId: string;

  // Profile Id (mandatory)
  profileId: number;

  // OpenWrap AdUnit Id (mandatory)
  owAdUnitId: string;

  // GAM AdUnit Id (mandatory)
  gamAdUnitId: string;

  // AdSizes (mandatory)
  adSizes: AdSize[];
}
