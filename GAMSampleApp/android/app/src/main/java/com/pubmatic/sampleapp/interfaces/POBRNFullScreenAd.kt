package com.pubmatic.sampleapp.interfaces

/**
 * Protocol for FullScreen ad API's.
 * Implement the protocol for creating full screen ads.
 * It contains basic functions required to implement a full screen ad,
 * it can be customized as per the requirements.
 */
interface POBRNFullScreenAd {
    /**
     * Method to be called to create and load full screen ad.
     */
    fun loadAd()

    /**
     * Method to be called to show full screen ad.
     * Check the ready status of the ad before calling show using [isReady] method.
     */
    fun showAd()

    /**
     * Method to be called to destroy full screen ad.
     */
    fun destroyAd()

    /**
     * Method to check if Full Screen ad is ready to present.
     */
    fun isReady() : Boolean
}
