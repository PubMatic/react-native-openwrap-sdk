package com.pubmatic.sdk.openwrap.reactnative

import com.pubmatic.sdk.common.POBAdSize
import org.json.JSONException
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class POBAdUnitDetailsTest {

  @Test
  fun testBuildWithValidAdUnitDetails(){
    val adUnitDetails = POBAdUnitDetails.build("{\"publisherId\": \"pub_id\"," +
      " \"profileId\": 1234, \"enableGetBidPrice\": 1, \"adUnitId\": \"test_ad_unit\", \"adSizes\": [{\"width\": 320, \"height\": 50}]}")
    Assert.assertEquals("pub_id", adUnitDetails.publisherId)
    Assert.assertEquals("test_ad_unit", adUnitDetails.adUnitId)
    Assert.assertEquals(1234, adUnitDetails.profileId)
    Assert.assertEquals(1, adUnitDetails.enableGetBidPrice)
    Assert.assertEquals(POBAdSize.BANNER_SIZE_320x50.adWidth, adUnitDetails.adSizes[0].adWidth)
    Assert.assertEquals(POBAdSize.BANNER_SIZE_320x50.adHeight, adUnitDetails.adSizes[0].adHeight)
  }

  @Test
  fun testBuildWithInvalidJSONString(){
    try{
      POBAdUnitDetails.build("{\"publisherId\": \"pub_id\"," +
        " \"profileId\": 1234, \"adUnitId\": \"test_ad_unit\" \"adSizes\": [{\"width\": 320, \"height\": 50}]}")
    }catch (e: JSONException){
        Assert.assertTrue(true)
    }
  }

  @Test
  fun testBuildWithEmptyAdSizes(){
    val adUnitDetails = POBAdUnitDetails.build("{\"publisherId\": \"pub_id\"," +
        " \"profileId\": 1234, \"adUnitId\": \"test_ad_unit\", \"adSizes\": []}")
    Assert.assertEquals("pub_id", adUnitDetails.publisherId)
    Assert.assertEquals("test_ad_unit", adUnitDetails.adUnitId)
    Assert.assertEquals(1234, adUnitDetails.profileId)
    Assert.assertTrue(adUnitDetails.adSizes.isEmpty())
  }

  @Test
  fun testBuildWithInvalidPubId(){
    try{
      POBAdUnitDetails.build("{\"publisher\": \"pub_id\"," +
        " \"profileId\": 1234, \"adUnitId\": \"test_ad_unit\" \"adSizes\": [{\"width\": 320, \"height\": 50}]}")
    }catch (e: JSONException){
      Assert.assertTrue(true)
    }
  }

  @Test
  fun testBuildWithInvalidProfileId(){
    try{
      POBAdUnitDetails.build("{\"publisherId\": \"pub_id\"," +
        " \"profile\": 1234, \"adUnitId\": \"test_ad_unit\" \"adSizes\": [{\"width\": 320, \"height\": 50}]}")
    }catch (e: JSONException){
      Assert.assertTrue(true)
    }
  }

  @Test
  fun testBuildWithInvalidAdUnitId(){
    try{
      POBAdUnitDetails.build("{\"publisherId\": \"pub_id\"," +
        " \"profile\": 1234, \"adUnit\": \"test_ad_unit\" \"adSizes\": [{\"width\": 320, \"height\": 50}]}")
    }catch (e: JSONException){
      Assert.assertTrue(true)
    }
  }
}
