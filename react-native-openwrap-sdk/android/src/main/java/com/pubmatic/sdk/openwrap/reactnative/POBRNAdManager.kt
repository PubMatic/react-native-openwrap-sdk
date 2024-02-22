package com.pubmatic.sdk.openwrap.reactnative

/**
 *  Ad Manager class to store ad instances of OW ads
 */
object POBRNAdManager {

    private var instanceMap : HashMap<String, POBRNFullScreenAd> = HashMap();

    /**
     *  Method to put ad object in AdManager map
     */
    fun put(instanceId : String, ad : POBRNFullScreenAd){
        instanceMap[instanceId] = ad
    }

    /**
     *  Method to get ad object in AdManager map
     */
    fun get(instanceId : String) : POBRNFullScreenAd?{
        return instanceMap[instanceId]
    }

    /**
     *  Method to check if ad object with given instance id is present in AdManager map
     */
    fun contains(instanceId : String) : Boolean{
        return instanceMap.contains(instanceId)
    }

    /**
     *  Method to remove ad object with given instance Id in AdManager map
     */
    fun remove(instanceId: String) {
        instanceMap.remove(instanceId)
    }
}