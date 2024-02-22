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
 * Test class For Rewarded Ad Module
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [Build.VERSION_CODES.P])
class POBRNRewardedAdModuleTest {

    private var mockReactContext: ReactApplicationContext? = null

    private lateinit var rewardedAdModule: POBRNRewardedAdModule

    /**
     * Setup
     */
    @Before
    fun setup() {
        mockReactContext = Mockito.mock(ReactApplicationContext::class.java)
        rewardedAdModule = POBRNRewardedAdModule(mockReactContext as ReactApplicationContext)
        Mockito.`when`(mockReactContext?.currentActivity).thenReturn(
            Robolectric.buildActivity(
                Activity::class.java
            ).get()
        )

    }

    /**
     * Test to check name of module
     */
    @Test
    fun testGetName() {
        Assert.assertEquals(rewardedAdModule.name, POBRNRewardedAdModule.NAME)
    }

    /**
     * Test to create instance of POBRNRewardedAdModule
     */
    @Test
    fun testCreateInstance() {
        val rewardedAdModule = POBRNRewardedAdModule(mockReactContext!!)
        Assert.assertNotNull(rewardedAdModule)
    }

    /**
     * Test to CreateAdInstance rewarded ad
     */
    @Test
    fun testCreateAdInstance() {
        val instanceId = "instance1"
        val publisherId = "publisher1"
        val profileId = 123
        val adUnitId = "adUnit1"
        rewardedAdModule.createAdInstance(instanceId,publisherId, profileId, adUnitId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to load ad rewarded ad
     */
    @Test
    fun testLoadAd() {
        val instanceId = "instance1"
        var isLoaded = false
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        Mockito.`when`(rewardedAd.loadAd()).then {
            isLoaded = true
            return@then null
        }
        rewardedAdModule.loadAd(instanceId)
        Assert.assertTrue(isLoaded)
    }

    /**
     * Test to show ad rewarded ad
     */
    @Test
    fun testShowAd() {
        val instanceId = "instance1"
        var isShown = false
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        Mockito.`when`(rewardedAd.showAd()).then {
            isShown = true
            return@then null
        }
        rewardedAdModule.showAd(instanceId)
        Assert.assertTrue(isShown)
    }

    /**
     * Test to SkipAlertDialogInfo rewarded ad
     */
    @Test
    fun testSetSkipAlertDialogInfo() {
        val instanceId = "instance1"
        val title = "Skip Alert Title"
        val message = "Skip Alert Message"
        val resumeButtonText = "Resume"
        val closeButtonText = "Close"
        var isSkipAlert = false

        val mockRewardedAd = Mockito.mock(POBRNRewardedAd::class.java)

        Mockito.`when`(
            mockRewardedAd.setSkipAlertDialogInfo(
                title,
                message,
                resumeButtonText,
                closeButtonText
            )
        ).then {
            isSkipAlert = true
            return@then null
        }
        POBRNAdManager.put(instanceId, mockRewardedAd)
        rewardedAdModule.setSkipAlertDialogInfo(
            instanceId,
            title,
            message,
            resumeButtonText,
            closeButtonText
        )
        Assert.assertTrue(isSkipAlert)

    }

    /**
     * Test to destroy rewarded ad
     */
    @Test
    fun testDestroy() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.destroy(instanceId)
        Assert.assertFalse(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to isReady rewardedAd ad
     */
    @Test
    fun testIsReady() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.isReady(instanceId, PromiseImpl({}, {}))
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setRequest rewardedAd ad
     */
    @Test
    fun testSetRequest() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.setRequestParameters("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setImpression rewardedAd ad
     */
    @Test
    fun testSetImpression() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.setImpressionParameters("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to setBidEvent rewardedAd ad
     */
    @Test
    fun testSetBidEvent() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.setBidEvent(instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to proceedToLoadAd rewardedAd ad
     */
    @Test
    fun testProceedToLoadAd() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.proceedToLoadAd(instanceId, PromiseImpl({}, {}))
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

    /**
     * Test to proceedOnError rewardedAd ad
     */
    @Test
    fun testProceedOnError() {
        val instanceId = "instance2"
        val rewardedAd = Mockito.mock(POBRNRewardedAd::class.java)
        POBRNAdManager.put(instanceId, rewardedAd)
        rewardedAdModule.proceedOnError("{}", instanceId)
        Assert.assertTrue(POBRNAdManager.contains(instanceId))
    }

}
