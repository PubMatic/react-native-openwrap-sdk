/**
 * Holds the general information about an ad impression. It is required to pass the impression level information in bid request.
 * The object can be used to set {@link testCreativeId}, {@link customParameters} and {@link adPosition} on the Ad request.
 */
export class POBImpression {
  /**
   * This parameter is used to request a test creative.
   */
  testCreativeId?: string;

  private customParams?: string;

  /**
   * Custom parameters in the form of a Map. To set multiple values against same key, use array. Only use list of string as values.
   */
  set customParameters(customParams: Map<string, String[]>) {
    const customParamsObject = Object.fromEntries(customParams);
    this.customParams = JSON.stringify(customParamsObject);
  }

  /**
   * Fold placement of the ad to be served.
   * Default value if {@link POBImpression.POBAdPosition.unknown}
   * The {@link adPosition} API is only applicable for Banner Ads.
   * For Interstitial and Rewarded Ads, the {@link adPosition} will be by
   * default to {@link POBImpression.POBAdPosition.fullScreen}
   */
  adPosition: POBImpression.POBAdPosition = POBImpression.POBAdPosition.unknown;
}

export namespace POBImpression {
  /**
   * Fold placement of the ad to be served.
   */
  export enum POBAdPosition {
    /**
     * Unable to determine the ad position, use this value
     */
    unknown,

    /**
     * Ad position is visible
     */
    aboveTheFold,

    /**
     * Ad position is not visible and it needs user to scroll the page to make it visible
     */
    belowTheFold = 3,

    /**
     * Header position
     */
    header,

    /**
     * Footer position
     */
    footer,

    /**
     * In side menu
     */
    sidebar,

    /**
     * Ad is in full screen
     */
    fullScreen,
  }
}
