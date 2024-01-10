package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sdk.common.OpenWrapSDK
import com.pubmatic.sdk.common.POBInstanceProvider
import com.pubmatic.sdk.common.log.POBLog
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class OpenWrapSDKModuleTest {

    var module: OpenWrapSDKModule? = null

    @Before
    fun setUp(){
        val context = mock(ReactApplicationContext::class.java);
        module = OpenWrapSDKModule(context)
    }

    @Test
    fun testLogLevel(){
        module?.setLogLevel(-1)
        Assert.assertEquals(OpenWrapSDK.LogLevel.Warn, POBLog.getLogLevel())
        module?.setLogLevel(OpenWrapSDK.LogLevel.Debug.level)
        Assert.assertEquals(OpenWrapSDK.LogLevel.Debug, POBLog.getLogLevel())
    }

    @Test
    fun testCCPA(){
        module?.setCCPA("test");
        Assert.assertEquals("test", POBInstanceProvider.getSdkConfig().ccpa)
    }

    @Test
    fun testSetCopa(){
        module?.setCoppa(true)
        POBInstanceProvider.getSdkConfig().isCoppa?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testInternalBrowser(){
        module?.setUseInternalBrowser(true)
        Assert.assertTrue(POBInstanceProvider.getSdkConfig().isUseInternalBrowser)
    }

    @Test
    fun testGDPREnabled(){
        module?.setGDPREnabled(true)
        POBInstanceProvider.getSdkConfig().isGdprEnabled?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testGDPRConsent(){
        module?.setGDPRConsent("test")
        Assert.assertEquals("test", POBInstanceProvider.getSdkConfig().gdprConsent)
    }

    @Test
    fun testGetName(){
        Assert.assertEquals(OpenWrapSDKModule.Companion.NAME, module?.getName())
    }

    @Test
    fun testSSLEnabled(){
        module?.setSSLEnabled(true)
        Assert.assertTrue(POBInstanceProvider.getSdkConfig().isRequestSecureCreative)
    }

    @Test
    fun testLocationAccess(){
        module?.allowLocationAccess(true)
        Assert.assertTrue(POBInstanceProvider.getSdkConfig().isLocationAccessAllowed)
    }

    @Test
    fun testallowAdvertisingId(){
        module?.allowAdvertisingId(true)
        Assert.assertTrue(POBInstanceProvider.getSdkConfig().isAllowAdvertisingId)
    }

    @Test
    fun testLocation(){
        val locationJsonStr = "{\n" +
                " \"latitude\": 1.2,\n" +
                " \"longitude\": 1.5,\n" +
                " \"source\": 1,\n" +
                "}";
        val location = SDKPluginParserHelper.parseJsonToLocation(locationJsonStr)
        module?.setLocation(locationJsonStr)
        Assert.assertEquals(location.latitude, POBInstanceProvider.getSdkConfig().location?.latitude)
        Assert.assertEquals(location.longitude, POBInstanceProvider.getSdkConfig().location?.longitude)
        Assert.assertEquals(location.source, POBInstanceProvider.getSdkConfig().location?.source)
    }

    @Test
    fun testGetVersion(){
        Assert.assertEquals(OpenWrapSDK.getVersion(), module?.constants?.get(SDKPluginConstant.KEY_SDK_VERSION))
    }

    @Test
    fun testLocationInvalidData(){
        POBInstanceProvider.getSdkConfig().location = null
        val location = "{";
        module?.setLocation(location)
        Assert.assertNull(POBInstanceProvider.getSdkConfig().location)
    }

    @Test
    fun testUserInfo(){
        val userJsonStr = "{\n" +
                " \"city\": \"Pune\",\n" +
                " \"birthyear\": 1990,\n" +
                " \"country\": \"India\",\n" +
                " \"metro\": \"Pune\",\n" +
                " \"region\": \"MH\",\n" +
                " \"zip\": \"411045\",\n" +
                " \"gender\": 0,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        module?.setUserInfo(userJsonStr)
        val userInfo = SDKPluginParserHelper.parseJsonToUserInfo(userJsonStr)
        Assert.assertEquals(userInfo.city, POBInstanceProvider.getSdkConfig().userInfo?.city)
        Assert.assertEquals(userInfo.birthYear, POBInstanceProvider.getSdkConfig().userInfo?.birthYear)
        Assert.assertEquals(userInfo.country, POBInstanceProvider.getSdkConfig().userInfo?.country)
        Assert.assertEquals(userInfo.metro, POBInstanceProvider.getSdkConfig().userInfo?.metro)
        Assert.assertEquals(userInfo.zip, POBInstanceProvider.getSdkConfig().userInfo?.zip)
        Assert.assertEquals(userInfo.gender, POBInstanceProvider.getSdkConfig().userInfo?.gender)
        Assert.assertEquals(userInfo.keywords, POBInstanceProvider.getSdkConfig().userInfo?.keywords)
    }

    @Test
    fun testUserInfoInvalidData(){
        POBInstanceProvider.getSdkConfig().userInfo = null
        val userInfo = "{";
        module?.setUserInfo(userInfo)
        Assert.assertNull(POBInstanceProvider.getSdkConfig().userInfo)
    }

    @Test
    fun testApplicationInfo(){
        val appInfoJsonStr = "{\n" +
                " \"domain\": \"example.com\",\n" +
                " \"storeUrl\": \"https://example.com/app\",\n" +
                " \"isPaid\": true,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        module?.setApplicationInfo(appInfoJsonStr)
        val applicationInfo = SDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertEquals(applicationInfo.keywords, POBInstanceProvider.getSdkConfig().applicationInfo?.keywords)
        Assert.assertEquals(applicationInfo.domain, POBInstanceProvider.getSdkConfig().applicationInfo?.domain)
        Assert.assertEquals(applicationInfo.isPaid, POBInstanceProvider.getSdkConfig().applicationInfo?.isPaid)
        Assert.assertEquals(applicationInfo.storeURL, POBInstanceProvider.getSdkConfig().applicationInfo?.storeURL)
    }

    @Test
    fun testApplicationInfoInvalidData(){
        POBInstanceProvider.getSdkConfig().applicationInfo = null
        val appInfoJsonStr = "{";
        module?.setApplicationInfo(appInfoJsonStr)
        Assert.assertNull(POBInstanceProvider.getSdkConfig().applicationInfo)
    }
}
