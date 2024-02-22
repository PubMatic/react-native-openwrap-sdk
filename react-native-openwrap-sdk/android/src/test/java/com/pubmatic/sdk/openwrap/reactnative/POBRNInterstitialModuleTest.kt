package com.pubmatic.sdk.openwrap.reactnative

import android.app.Activity
import android.os.Build
import com.facebook.react.bridge.PromiseImpl
import com.facebook.react.bridge.ReactApplicationContext
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.robolectric.Robolectric
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

/**
 * POBRNInterstitialModuleTest class
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [Build.VERSION_CODES.P])
class POBRNInterstitialModuleTest {

    private var mockReactContext: ReactApplicationContext? = null

    private lateinit var module: POBRNInterstitialModule

    /**
     * Setup
     */
    @Before
    fun setup() {
        mockReactContext = Mockito.mock(ReactApplicationContext::class.java)
        module = POBRNInterstitialModule(mockReactContext as ReactApplicationContext)
        Mockito.`when`(mockReactContext?.currentActivity).thenReturn(
            Robolectric.buildActivity(
                Activity::class.java
            ).get()
        )

    }

    /**
     * Test to create instance of POBRNInterstitalModule
     */
    @Test
    fun testCreateInstance() {
        val interstitialModule = POBRNInterstitialModule(mockReactContext!!)
        Assert.assertNotNull(interstitialModule)
    }

    /**
     * Test to load interstitial ad
     */
    @Test
    fun testLoadAd() {
        val instanceId = "instance1"
        var isLoaded = false
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        Mockito.`when`(interstitial.loadAd()).then {
            isLoaded = true
            return@then null
        }
        module.loadAd(instanceId)
        Assert.assertTrue(isLoaded)
    }

    /**
     * Test to show interstitial ad
     */
    @Test
    fun testShowAd() {
        val instanceId = "instance1"
        var isShown = false
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        Mockito.`when`(interstitial.showAd()).then {
            isShown = true
            return@then null
        }
        module.showAd(instanceId)
        Assert.assertTrue(isShown)
    }

    /**
     * Test to destroy interstitial ad
     */
    @Test
    fun testDestroy() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.destroy(instanceId)
        Assert.assertFalse(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to isReady interstitial ad
     */
    @Test
    fun testIsReady() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.isReady(instanceId, PromiseImpl({}, {}))
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setRequest interstitial ad
     */
    @Test
    fun testSetRequest() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.setRequestParameters("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setImpression interstitial ad
     */
    @Test
    fun testSetImpression() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.setImpressionParameters("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setBidEvent interstitial ad
     */
    @Test
    fun testSetBidEvent() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.setBidEvent(instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to proceedToLoadAd interstitial ad
     */
    @Test
    fun testProceedToLoadAd() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.proceedToLoadAd(instanceId, PromiseImpl({}, {}))
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to proceedOnError interstitial ad
     */
    @Test
    fun testProceedOnError() {
        val instanceId = "instance2"
        val interstitial = Mockito.mock(POBRNInterstitialAd::class.java)
        POBRNAdManager.put(instanceId, interstitial)
        module.proceedOnError("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to check name of module
     */
    @Test
    fun testGetName(){
        Assert.assertEquals(module.name,POBRNInterstitialModule.NAME)
    }
}
