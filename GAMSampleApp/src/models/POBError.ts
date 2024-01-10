/**
 * Maintains the OpenWrap error code along with specific error message
 */
export class POBError {

  /**
   * You may not passing mandatory parameters like Publisher ID, Sizes, and other ad tag details.
   */
  static readonly INVALID_REQUEST = 1001;

  /**
   * There was no ads available to deliver for ad request.
   */
  static readonly NO_ADS_AVAILABLE = 1002;

  /**
   * There was an error while retrieving the data from the network.
   */
  static readonly NETWORK_ERROR = 1003;

  /**
   * Failed to process ad request by Ad Server.
   */
  static readonly SERVER_ERROR = 1004;

  /**
   * Ad request was timed out
   */
  static readonly TIMEOUT_ERROR = 1005;

  /**
   * Internal error
   */
  static readonly INTERNAL_ERROR = 1006;

  /**
   * Invalid ad response. SDK does not able to parse the response received from Server.
   */
  static readonly INVALID_RESPONSE = 1007;

  /**
   * Ad request gets cancelled.
   */
  static readonly REQUEST_CANCELLED = 1008;

  /**
   * There was some issue while rendering the creative.
   */
  static readonly RENDER_ERROR = 1009;

  /**
   * Ad server SDK sent unexpectd/delayed OpenWrap win response
   */
  static readonly OPENWRAP_SIGNALING_ERROR = 1010;

  /**
   * Indicates an ad is expired
   */
  static readonly AD_EXPIRED = 1011;

  /**
   * Indicates an ad request is not allowed.
   */
  static readonly AD_REQUEST_NOT_ALLOWED = 1012;

  /**
   * Indicates the Ad is already shown
   */
  static readonly AD_ALREADY_SHOWN = 2001;

  /**
   * Indicates the Ad is not ready to show yet.
   */
  static readonly AD_NOT_READY = 2002;

  /**
   * Indicates partner details are not found
   */
  static readonly NO_PARTNER_DETAILS = 4001;

  /**
   * Indicates invalid reward selection
   */
  static readonly INVALID_REWARD_SELECTED = 5001;

  /**
   * Indicates Rewarded ad has encountered some configuration error
   */
  static readonly REWARD_NOT_SELECTED = 5002;

  /**
   * Error code
   */
  public errorCode: number;

  /**
   * Error message
   */
  public errorMessage: string;

  /**
   * Constructor.
   * Initializes and returns newly allocated error object.
   *
   * @param errorCode Error code
   * @param errorMessage Error message
   */
  constructor(errorCode: number, errorMessage: string) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  /**
   * Used to convert the object to string for better readability.
   * @returns Stringified error.
   */
  public toString(): string {
    return `POBError{ errorCode=${this.errorCode}, errorMessage='${this.errorMessage}' }`;
  }
}
