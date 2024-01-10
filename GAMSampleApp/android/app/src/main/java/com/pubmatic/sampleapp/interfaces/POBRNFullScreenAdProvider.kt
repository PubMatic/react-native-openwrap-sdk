package com.pubmatic.sampleapp.interfaces

import com.facebook.react.bridge.Promise

/**
 * Interface for FullScreen ad API's. This interface will be implemented by Full Screen ad modules
 */
interface POBRNFullScreenAdProvider {

    /**
     * Method to create instance of full screen ad
     */
    fun createAdInstance(publisherId : String, profileId : Double, owAdUnitId : String, gamAdUnitId : String)

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
    fun destroyAd()

    /**
     * Method to check if Full Screen ad is ready to present
     */
    fun isReady(promise: Promise)
}
