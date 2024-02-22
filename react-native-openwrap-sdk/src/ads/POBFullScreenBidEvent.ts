import { POBBid } from '../models/POBBid';
import { POBBidEvent } from './POBBidEvent';
import { POBBidEventListener } from './POBBidEventListener';

/**
 * Interface definition to handle bid events for full screen ads.
 */
export interface POBFullScreenBidEvent extends POBBidEvent {
  /**
   * Sets Bid event listener to receive bid event notification.
   *
   * @param listener reference of {@link POBBidEventListener}
   */
  setBidEventListener(listener: POBBidEventListener): void;

  /**
   * Method to get the bid object for the requested Ad.
   * Make sure to call the method after the ad is received.
   *
   * @returns POBBid object is the Ad is loaded else undefined.
   */
  getBid(): POBBid | undefined;
}
