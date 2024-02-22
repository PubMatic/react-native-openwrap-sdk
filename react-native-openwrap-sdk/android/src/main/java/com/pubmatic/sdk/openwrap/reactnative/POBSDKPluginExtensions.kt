package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.pubmatic.sdk.openwrap.core.POBBid
import com.pubmatic.sdk.openwrap.core.POBBidEvent
import org.json.JSONException
import org.json.JSONObject

/**
 * Used to convert bid object to JSONObject.
 *
 * @return JSONObject with Bid details
 */
fun POBBid.toJson(): JSONObject {
    val bidMap = JSONObject()
    bidMap.put(POBSDKPluginConstant.PRICE, this.price)
    this.targetingInfo?.let { targetingInfo ->
        val targetingJson = JSONObject(targetingInfo as Map<String, String>)
        bidMap.put(POBSDKPluginConstant.TARGETING, targetingJson)
    }
    bidMap.put(POBSDKPluginConstant.HEIGHT, this.height)
    bidMap.put(POBSDKPluginConstant.WIDTH, this.width)
    this.creativeType?.let { creativeType ->
        bidMap.put(POBSDKPluginConstant.CR_TYPE, creativeType)
    }
    this.partnerName?.let { partnerName ->
        bidMap.put(POBSDKPluginConstant.PARTNER_NAME, partnerName)
    }
    this.id?.let {
        bidMap.put(POBSDKPluginConstant.BID_ID, it)
    }
    this.impressionId?.let {
        bidMap.put(POBSDKPluginConstant.IMPRESSION_ID, it)
    }
    this.bundle?.let {
        bidMap.put(POBSDKPluginConstant.BUNDLE, it)
    }
    bidMap.put(POBSDKPluginConstant.GROSS_PRICE, this.grossPrice)
    bidMap.put(POBSDKPluginConstant.STATUS, this.status)
    this.creativeId?.let {
        bidMap.put(POBSDKPluginConstant.CREATIVE_ID, it)
    }
    this.getnURL()?.let {
        bidMap.put(POBSDKPluginConstant.NURL, it)
    }
    this.getlURL()?.let {
        bidMap.put(POBSDKPluginConstant.LURL, it)
    }
    this.creative?.let {
        bidMap.put(POBSDKPluginConstant.CREATIVE, it)
    }
    this.dealId?.let {
        bidMap.put(POBSDKPluginConstant.DEAL_ID, it)
    }
    bidMap.put(POBSDKPluginConstant.REFRESH_INTERVAL, this.refreshInterval)
    this.firstReward?.let {
        bidMap.put(POBSDKPluginConstant.REWARD_AMOUNT_KEY, it.amount)
        bidMap.put(POBSDKPluginConstant.REWARD_CURRENCY_TYPE_KEY, it.currencyType)
    }
    return bidMap
}

/**
 * Used to convert bid object to WritableMap.
 *
 * @return WritableMap with bid details
 */
fun POBBid.toMap(): WritableMap {
    val bidMap = Arguments.createMap()
    bidMap.putDouble(POBSDKPluginConstant.PRICE, this.price)
    this.targetingInfo?.let { targetingInfo ->
        bidMap.putMap(
            POBSDKPluginConstant.TARGETING,
            targetingInfo.toReadableMap()
        )
    }
    bidMap.putInt(POBSDKPluginConstant.HEIGHT, this.height)
    bidMap.putInt(POBSDKPluginConstant.WIDTH, this.width)
    this.creativeType?.let { creativeType ->
        bidMap.putString(POBSDKPluginConstant.CR_TYPE, creativeType)
    }
    this.partnerName?.let { partnerName ->
        bidMap.putString(POBSDKPluginConstant.PARTNER_NAME, partnerName)
    }
    this.id?.let {
        bidMap.putString(POBSDKPluginConstant.BID_ID, it)
    }
    this.impressionId?.let {
        bidMap.putString(POBSDKPluginConstant.IMPRESSION_ID, it)
    }
    this.bundle?.let {
        bidMap.putString(POBSDKPluginConstant.BUNDLE, it)
    }
    bidMap.putDouble(POBSDKPluginConstant.GROSS_PRICE, this.grossPrice)
    bidMap.putInt(POBSDKPluginConstant.STATUS, this.status)
    this.creativeId?.let {
        bidMap.putString(POBSDKPluginConstant.CREATIVE_ID, it)
    }
    this.getnURL()?.let {
        bidMap.putString(POBSDKPluginConstant.NURL, it)
    }
    this.getlURL()?.let {
        bidMap.putString(POBSDKPluginConstant.LURL, it)
    }
    this.creative?.let {
        bidMap.putString(POBSDKPluginConstant.CREATIVE, it)
    }
    this.dealId?.let {
        bidMap.putString(POBSDKPluginConstant.DEAL_ID, it)
    }
    bidMap.putInt(POBSDKPluginConstant.REFRESH_INTERVAL, this.refreshInterval)
    this.firstReward?.let {
        bidMap.putInt(POBSDKPluginConstant.REWARD_AMOUNT_KEY, it.amount)
        bidMap.putString(POBSDKPluginConstant.REWARD_CURRENCY_TYPE_KEY, it.currencyType)
    }
    return bidMap
}

/**
 * Used to convert Map of string, string to Readable Map.
 *
 * @return Converted ReadableMap
 */
fun Map<String, String>.toReadableMap(): ReadableMap {
    val readableMap = Arguments.createMap()
    for ((key, value) in this) {
        readableMap.putString(key, value)
    }
    return readableMap
}

/**
 * Method to convert json error to [POBBidEvent.BidEventError]
 *
 * @return Instance of [POBBidEvent.BidEventError]
 */
fun String.toBidEventError(): POBBidEvent.BidEventError {
    return try {
        val json = JSONObject(this)
        val errorCode = json.getInt(POBSDKPluginConstant.ERROR_CODE_KEY)
        POBBidEvent.BidEventError.values().getOrElse(errorCode) { POBBidEvent.BidEventError.OTHER }
    } catch (e: JSONException) {
        POBBidEvent.BidEventError.OTHER
    }
}
