package com.pubmatic.sdk.openwrap.reactnative

import com.pubmatic.sdk.openwrap.core.POBBidEventListener

/**
 * Interface for FullScreen ad API's. This interface will be implemented by Full Screen ad
 */
interface POBRNFullScreenAd {
    /**
     * Method to load ad
     */
    fun loadAd()

    /**
     * Method to show full screen ad
     */
    fun showAd()

    /**
     * Method to destroy ad
     */
    fun destroy()

    /**
     * Method to check if Full Screen ad is ready to present
     */
    fun isReady() : Boolean

    /**
     * Method to set request parameters for full screen object
     */
    fun setRequestParameters(paramString : String)

    /**
     * Method to set impression parameters for full screen object
     */
    fun setImpressionParameters(paramString : String)

    /**
     * Proceeds with bid flow, This method should be called only when [POBBidEventListener] is set
     * Note: Should be called from Main/UI thread. Also, unnecessary duplicate call will fail and
     * appropriate errors will be logged with return value `false`
     *
     * @return Returns the boolean value indicating success or failure.
     */
    fun proceedToLoadAd(): Boolean

    /**
     * Proceeds with error, flow is completed by setting its state to default considering
     * error at client side.
     * Note: Should be called from Main/UI thread
     *
     * @param error the error of type stringified {@link BidEventError}
     *              Example:
     *              Scenario 1 : When bid is failed in client-side in-app auction loss
     *              proceedOnError(BidEventError#CLIENT_SIDE_AUCTION_LOSS);
     *              <p>
     *              Scenario 2 : When bid is expired
     *              proceedOnError(BidEventError#BID_EXPIRED);
     */
    fun proceedOnError(error: String)

    /**
     * Sets Bid event listener to enable "get bid price" feature.
     */
    fun setBidEventListener()

    /**
     * Method to check if Bid is expired for the Ad
     */
    fun isBidExpired() : Boolean
}