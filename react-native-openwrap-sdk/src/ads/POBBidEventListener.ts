import { POBError } from './../models/POBError';
import { POBBid } from './../models/POBBid';
import { POBBidEvent } from './POBBidEvent';

/**
 * Interface for notifying bid events.
 */
export interface POBBidEventListener {
    /**
     * Notifies bid has been successfully received.
     *
     * @param bidEvent reference of {@link POBBidEvent} interface i.e. Instance of class which implements
     *                 {@link POBBidEvent}
     * @param bid the instance of {@link POBBid}
     */
    onBidReceived(bidEvent: POBBidEvent, bid: POBBid): void;

    /**
     * Notifies an error encountered while fetching the bid.
     *
     * @param bidEvent reference of {@link POBBidEvent} interface i.e. Instance of class which implements
     *                 {@link POBBidEvent}
     * @param error the error of type {@link POBError} while fetching bid
     */
    onBidFailed(bidEvent: POBBidEvent, error: POBError): void;
}
