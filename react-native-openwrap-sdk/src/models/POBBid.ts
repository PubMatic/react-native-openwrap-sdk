import { POBReward } from './POBReward';
import { POBBidHandler } from './POBBidHandler';

/**
 * Parameters of POBBid class.
 */
type _POBBidParams = {
  price: number;
  targeting?: {};
  height: number;
  width: number;
  crType?: string;
  partnerName?: string;
  bidId?: string;
  impressionId?: string;
  bundle?: string;
  grossPrice: number;
  status: number;
  creativeId?: string;
  nurl?: string;
  lurl?: string;
  creative?: string;
  dealId?: string;
  refreshInterval: number;
  rewardAmount?: number;
  rewardCurrencyType?: string;
};

/**
 * A data class representing the bid related data like price, crType, targeting, etc.
 */
export class POBBid {
  /**
   * Returns Net Price/bid value
   * This method is updated to return net price from OW SDK v2.4.0.
   * See {@link grossPrice}
   * @return Net Ecpm price / bid value
   */
  readonly price: number;

  /**
   * Returns the map of targeting information, that needs to be passed to ad server SDK.
   * If the the bid is not valid bid (check with its status see {@link POBBid.BID_STATUS_OK}) it returns null else return
   * valid bid targeting info map
   *
   * @return Map of targeting information
   */
  readonly targeting?: Map<string, string>;

  /**
   * Returns height of a current bid
   *
   * @return height of an ad creative
   */
  readonly height: number;

  /**
   * Returns width of a current bid
   *
   * @return width of an ad creative
   */
  readonly width: number;

  /**
   * Returns creative type of the current bid.
   *
   * @returns creative type of an ad creative.
   */
  readonly crType?: string;

  /**
   * Returns the name of the winning partner
   *
   * @return Name of the winning partner
   */
  readonly partnerName?: string;

  /**
   * Return bid id of the bid
   *
   * @return bid id of type String
   */
  readonly bidId?: string;

  /**
   * Returns an Impression Id. Also used as a bid id
   *
   * @return Impression Id
   */
  readonly impressionId?: string;

  /**
   * A platform-specific application identifier intended to be
   * unique to the app and independent of the exchange.
   *
   * @returns Package name in case of Android and numeric Id in case of iOS.
   */
  readonly bundle?: string;

  /**
   * Returns Gross Price/bid value
   *
   * @return Gross Ecpm price/bid value
   */
  readonly grossPrice: number;

  /**
   * Returns Bid status
   *
   * @return Returns bid status as {@link POBBid.BID_STATUS_OK},
   * if ecpm price is greater than 0 else return {@link POBBid.BID_STATUS_NOT_OK}.
   */
  readonly status: number;

  /**
   * Returns the creative Id
   *
   * @return Creative Id
   */
  readonly creativeId?: string;

  /**
   * Returns Win notice URL called by the exchange if the bid wins
   *
   * @return Notice URL
   */
  readonly nurl?: string;

  /**
   * Returns Loss notice URL called by the exchange if the bid lose.
   *
   * @return loss url
   */
  readonly lurl?: string;

  /**
   * Returns ad creative
   *
   * @return Ad creative
   */
  readonly creative?: string;

  /**
   * Returns deal Id. Used for PMP deals.
   *
   * @return Deal Id
   */
  readonly dealId?: string;

  /**
   * Returns the refresh interval received in ad response
   *
   * @return refresh interval
   */
  readonly refreshInterval: number;

  /**
   * Returns the first Reward object's (if any) from the rewards array under bid extension.
   * If no rewards found then it returns null.
   *
   * @return the first Reward object.
   */
  readonly reward?: POBReward;

  private readonly bidHandler: POBBidHandler;

  constructor(bidInfo: _POBBidParams, bidHandler: POBBidHandler ) {
    this.bidHandler = bidHandler
    this.price = bidInfo.price;
    this.targeting =
      bidInfo.targeting !== undefined
        ? new Map(Object.entries(bidInfo.targeting))
        : undefined;
    this.height = bidInfo.height;
    this.width = bidInfo.width;
    this.crType = bidInfo.crType;
    this.partnerName = bidInfo.partnerName;
    this.bidId = bidInfo.bidId;
    this.impressionId = bidInfo.impressionId;
    this.bundle = bidInfo.bundle;
    this.grossPrice = bidInfo.grossPrice;
    this.status = bidInfo.status;
    this.creativeId = bidInfo.creativeId;
    this.nurl = bidInfo.nurl;
    this.lurl = bidInfo.lurl;
    this.creative = bidInfo.creative;
    this.dealId = bidInfo.dealId;
    this.refreshInterval = bidInfo.refreshInterval;
    if (
      bidInfo.rewardCurrencyType !== undefined &&
      bidInfo.rewardAmount !== undefined
    ) {
      this.reward = new POBReward(
        bidInfo.rewardCurrencyType,
        bidInfo.rewardAmount
      );
    }
  }

  /**
   * Checks if the bid has expired or not.
   * Returns a Promise that resolves with a boolean value indicating
   * the bid expiry status (true if expired, false if still valid).
   */
  public isExpired(): Promise<Boolean> {
    return this.bidHandler.isBidExpired();
  }

  public toString(): string {
    let bidDetails = '{';
    bidDetails += ' Price=';
    bidDetails += this.price;
    bidDetails += ', PartnerName=';
    bidDetails += this.partnerName;
    bidDetails += ', ImpressionId=';
    bidDetails += this.impressionId;
    bidDetails += ', BidId=';
    bidDetails += this.bidId;
    bidDetails += ', CreativeId=';
    bidDetails += this.creativeId;
    if (this.reward !== undefined) {
      bidDetails += ', Reward=';
      bidDetails += this.reward.toString();
    }
    if (this.targeting != null) {
      bidDetails += ', Targeting Info= ';
      bidDetails += `{${Array.from(this.targeting)}}`;
    }
    bidDetails += '}';
    return bidDetails;
  }
}

export namespace POBBid {
  /**
   * Constant for OK status
   */
  export const BID_STATUS_OK = 1;

  /**
   * Constant for NOT OK status
   */
  export const BID_STATUS_NOT_OK = 2;
}
