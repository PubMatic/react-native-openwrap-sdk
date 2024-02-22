import { POBBidEventListener } from './POBBidEventListener';
import { POBBidError } from '../models/POBBidError';

/**
 * Interface definition to handle bid events.
 */
export interface POBBidEvent {
    /**
     * Proceeds with bid flow, This method should be called only when {@link POBBidEventListener} is set
     * Note: Unnecessary duplicate call will fail and
     * appropriate errors will be logged with return value `false`
     *
     * @return Returns the boolean value indicating success or failure.
     */
    proceedToLoadAd(): Promise<Boolean>;

    /**
     * Proceeds with error, the flow is completed by setting its state to default considering
     * error at client side.
     *
     * @param error the error of type {@link POBBidError}
     *              Example:
     *              Scenario 1 : When bid is failed in client-side in-app auction loss
     *              proceedOnError() with {@link POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS} errorCode.
     *              <p>
     *              Scenario 2 : When bid is expired
     *              proceedOnError() with {@link POBBidError.POBBidErrorCode.BID_EXPIRED} errorCode.
     */
    proceedOnError(error: POBBidError): void;
}
