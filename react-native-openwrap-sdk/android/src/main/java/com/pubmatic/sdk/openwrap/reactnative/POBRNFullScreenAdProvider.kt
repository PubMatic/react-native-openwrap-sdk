package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.Promise
import com.pubmatic.sdk.openwrap.core.POBBidEventListener

/**
 * Interface for FullScreen ad API's. This interface will be implemented by Full Screen ad modules
 */
interface POBRNFullScreenAdProvider {

    /**
     * Method to create instance of full screen ad
     */
    fun createAdInstance(instanceId : String, publisherId : String, profileId : Int, adUnitId : String)

    /**
     * Method to load ad
     */
    fun loadAd(instanceId : String)

    /**
     * Method to show full screen ad
     */
    fun showAd(instanceId : String)

    /**
     * Method to destroy ad
     */
    fun destroy(instanceId : String)

    /**
     * Method to check if Full Screen ad is ready to present
     */
    fun isReady(instanceId : String, promise: Promise)

    /**
     * Method to set request parameters for full screen object
     */
    fun setRequestParameters(paramString : String, instanceId: String)

    /**
     * Method to set request parameters for full screen object
     */
    fun setImpressionParameters(paramString : String, instanceId: String)

    /**
     * Sets Bid event listener to enable "get bid price".
     */
    fun setBidEvent(instanceId: String)

    /**
     * Proceeds with bid flow, This method should be called only when [POBBidEventListener] is set
     * Note: Should be called from Main/UI thread. Also, unnecessary duplicate call will fail and
     * appropriate errors will be logged with return value `false`
     *
     * @return Returns the boolean value indicating success or failure.
     */
    fun proceedToLoadAd(instanceId: String, promise: Promise)

    /**
     * Proceeds with error, flow is completed by setting its state to default considering
     * error at client side.
     * Note: Should be called from Main/UI thread
     *
     * @param error the stringified error of type String
     */
    fun proceedOnError(error: String, instanceId: String)

    /**
     * Method to check if Bid is expired for the Ad with associated [instanceId]
     *
     * @param instanceId Instance id of the Full screen ad
     * @param promise Used to resolve with the 1 or 0 value based on bid expiry
     */
    fun isBidExpired(instanceId : String, promise: Promise)
}