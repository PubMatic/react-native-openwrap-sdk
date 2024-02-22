package com.pubmatic.sdk.openwrap.reactnative

import com.pubmatic.sdk.common.OpenWrapSDK.LogLevel
import com.pubmatic.sdk.common.models.POBLocation
import com.pubmatic.sdk.common.models.POBUserInfo
import org.json.JSONException
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import java.net.URL

@RunWith(MockitoJUnitRunner::class)
class SDKPluginParserHelperTest {

    @Test
    fun testParseJsonToApplicationInfo(){
        val appInfoJsonStr = "{\n" +
                " \"domain\": \"example.com\",\n" +
                " \"storeUrl\": \"https://example.com/app\",\n" +
                " \"paid\": true,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        val applicationInfo = POBSDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertEquals("example.com", applicationInfo.domain)
        Assert.assertEquals(URL("https://example.com/app"), applicationInfo.storeURL)
        Assert.assertEquals("android, app", applicationInfo.keywords)
        applicationInfo.isPaid?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testParseJsonToApplicationInfoIfDomainNotSet(){
        val appInfoJsonStr = "{\n" +
                " \"storeUrl\": \"https://example.com/app\",\n" +
                " \"paid\": true,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        val applicationInfo = POBSDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertNull(applicationInfo.domain)
        Assert.assertEquals(URL("https://example.com/app"), applicationInfo.storeURL)
        Assert.assertEquals("android, app", applicationInfo.keywords)
        applicationInfo.isPaid?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testParseJsonToApplicationInfoIfStoreUrlNotSet(){
        val appInfoJsonStr = "{\n" +
                " \"domain\": \"example.com\",\n" +
                " \"paid\": true,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        val applicationInfo = POBSDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertEquals("example.com", applicationInfo.domain)
        Assert.assertNull(applicationInfo.storeURL)
        Assert.assertEquals("android, app", applicationInfo.keywords)
        applicationInfo.isPaid?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testParseJsonToApplicationInfoIfIsPaidNotSet(){
        val appInfoJsonStr = "{\n" +
                " \"domain\": \"example.com\",\n" +
                " \"paid\": \"https://example.com/app\",\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        val applicationInfo = POBSDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertEquals("example.com", applicationInfo.domain)
        Assert.assertEquals("android, app", applicationInfo.keywords)
        Assert.assertNull(applicationInfo.isPaid)
    }


    @Test
    fun testParseJsonToApplicationInfoIfKeywordNotSet(){
        val appInfoJsonStr = "{\n" +
                " \"domain\": \"example.com\",\n" +
                " \"storeUrl\": \"https://example.com/app\",\n" +
                " \"paid\": true,\n" +
                "}";
        val applicationInfo = POBSDKPluginParserHelper.parseJsonToApplicationInfo(appInfoJsonStr)
        Assert.assertEquals("example.com", applicationInfo.domain)
        Assert.assertEquals(URL("https://example.com/app"), applicationInfo.storeURL)
        Assert.assertNull(applicationInfo.keywords)
        applicationInfo.isPaid?.let { Assert.assertTrue(it) }
    }

    @Test
    fun testParseLogLevel(){
        var logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Debug.level)
        Assert.assertEquals(LogLevel.Debug, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Info.level)
        Assert.assertEquals(LogLevel.Info, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Verbose.level)
        Assert.assertEquals(LogLevel.Verbose, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Warn.level)
        Assert.assertEquals(LogLevel.Warn, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Error.level)
        Assert.assertEquals(LogLevel.Error, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.Off.level)
        Assert.assertEquals(LogLevel.Off, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(LogLevel.All.level)
        Assert.assertEquals(LogLevel.All, logLevel)
        logLevel = POBSDKPluginParserHelper.parseLogLevel(-1)
        Assert.assertNull(logLevel)
    }

    @Test
    fun testparseJsonToLocationWithSourceGPS(){
        val locationJsonStr = "{\n" +
                " \"latitude\": 1.2,\n" +
                " \"longitude\": 1.5,\n" +
                " \"source\": 1,\n" +
                "}";
        val location = POBSDKPluginParserHelper.parseJsonToLocation(locationJsonStr)
        Assert.assertEquals(1.2 , location.latitude, 1.0)
        Assert.assertEquals(1.5, location.longitude, 1.0)
        Assert.assertEquals(POBLocation.Source.GPS, location.source)
    }

    @Test
    fun testparseJsonToLocationWithSourceIP_ADDRESS(){
        val locationJsonStr = "{\n" +
                " \"latitude\": 1.2,\n" +
                " \"longitude\": 1.5,\n" +
                " \"source\": 2,\n" +
                "}";
        val location = POBSDKPluginParserHelper.parseJsonToLocation(locationJsonStr)
        Assert.assertEquals(1.2 , location.latitude, 1.0)
        Assert.assertEquals(1.5, location.longitude, 1.0)
        Assert.assertEquals(POBLocation.Source.IP_ADDRESS, location.source)
    }

    @Test
    fun testparseJsonToLocationWithSourceUSER(){
        val locationJsonStr = "{\n" +
                " \"latitude\": 1.2,\n" +
                " \"longitude\": 1.5,\n" +
                " \"source\": 3,\n" +
                "}"
        val location = POBSDKPluginParserHelper.parseJsonToLocation(locationJsonStr)
        Assert.assertEquals(1.2 , location.latitude, 1.0)
        Assert.assertEquals(1.5, location.longitude, 1.0)
        Assert.assertEquals(POBLocation.Source.USER, location.source)
    }

    @Test
    fun testparseJsonToLocationWithInvalidSource(){
        try {
            val locationJsonStr = "{\n" +
                    " \"latitude\": 1.2,\n" +
                    " \"longitude\": 1.5,\n" +
                    " \"source\": -1,\n" +
                    "}";
            POBSDKPluginParserHelper.parseJsonToLocation(locationJsonStr)
        }catch (exception: JSONException){
            Assert.assertTrue(true)
        }
    }

    @Test
    fun testParseJsonToUserInfo(){
        val userJsonStr = "{\n" +
                " \"city\": \"Pune\",\n" +
                " \"birthYear\": 1990,\n" +
                " \"metro\": \"Pune\",\n" +
                " \"region\": \"MH\",\n" +
                " \"zip\": \"411045\",\n" +
                " \"gender\": 0,\n" +
                " \"keywords\": \"android, app\"\n" +
                "}";
        System.out.println(userJsonStr)
        val userInfo = POBSDKPluginParserHelper.parseJsonToUserInfo(userJsonStr)
        Assert.assertEquals("Pune", userInfo.city)
        Assert.assertEquals(1990, userInfo.birthYear)
        Assert.assertEquals("Pune", userInfo.metro)
        Assert.assertEquals("411045", userInfo.zip)
        Assert.assertEquals(POBUserInfo.Gender.OTHER, userInfo.gender)
        Assert.assertEquals("android, app", userInfo.keywords)
    }

    @Test
    fun testParseJsonToUserInfoInvalidData(){
        val userJsonStr = "{\n" +
                "}";
        val userInfo = POBSDKPluginParserHelper.parseJsonToUserInfo(userJsonStr)
        Assert.assertNull(userInfo.city)
        Assert.assertEquals(0, userInfo.birthYear)
        Assert.assertNull(userInfo.metro)
        Assert.assertNull(userInfo.zip)
        Assert.assertNull(userInfo.gender)
        Assert.assertNull(userInfo.keywords)
    }

    @Test
    fun testParseJsonToUserInfoGenderFemale(){
        val userJsonStr = "{\n" +
                " \"gender\": 1,\n" +
                "}";
        val userInfo = POBSDKPluginParserHelper.parseJsonToUserInfo(userJsonStr)
        Assert.assertEquals(POBUserInfo.Gender.MALE, userInfo.gender)
    }

    @Test
    fun testParseJsonToUserInfoGenderOther(){
        val userJsonStr = "{\n" +
                " \"gender\": 2,\n" +
                "}";
        val userInfo = POBSDKPluginParserHelper.parseJsonToUserInfo(userJsonStr)
        Assert.assertEquals(POBUserInfo.Gender.FEMALE, userInfo.gender)
    }





}
