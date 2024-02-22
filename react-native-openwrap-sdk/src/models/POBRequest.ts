/**
 * Class to represent the OpenWrap ad request.
 * The object can be used to set {@link testMode}, {@link bidSummary}, {@link serverUrl}, {@link debugEnabled}, {@link versionId} and {@link networkTimeout} on the Ad request.
 */
export class POBRequest {
  /**
   * Indicates whether this request is a test request.
   * By default, Test Mode is disabled.
   * When enabled, this request is treated as a test request.
   * PubMatic may deliver only test ads which are not billable.
   * Please disable the Test Mode for requests before you submit your application to the play store.
   */
  testMode?: boolean;

  /**
   * Disables bid summary that is sent in the response, if true.
   * Default value is true.
   */
  bidSummary?: boolean;

  /**
   * Custom server URL for debugging purpose.
   * If it is set, ad request will be made to the provided url
   */
  serverUrl?: string;

  /**
   * This flag is used to get the debug details in ad response
   */
  debugEnabled?: boolean;

  /**
   * This is used to specify OpenWrap version Id of the publisher. If this is not
   * specified, live version of the profile is considered.
   */
  versionId?: number;

  /**
   * Maximum network timeout for Ad request.
   */
  networkTimeout?: number;
}
