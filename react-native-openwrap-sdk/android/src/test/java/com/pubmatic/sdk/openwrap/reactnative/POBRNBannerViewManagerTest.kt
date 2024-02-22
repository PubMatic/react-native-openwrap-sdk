package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class POBRNBannerViewManagerTest {

    private val themedReactContext = Mockito.mock(ThemedReactContext::class.java)
    private lateinit var bannerViewManager: POBRNBannerViewManager

    @Before
    fun setUp() {
        bannerViewManager = POBRNBannerViewManager()
    }

    @Test
    fun testGetName() {
        Assert.assertEquals("POBRNBannerView", bannerViewManager.name)
    }

    @Test
    fun testCreateViewInstance() {
        val bannerView: POBRNBannerView =
            bannerViewManager.createView(123, themedReactContext, null, null, null)
        Assert.assertNotNull(bannerView)
    }

    @Test
    fun testGetExportedCustomDirectEventTypeConstants() {
        val directEventMap: MutableMap<String, Any>? =
            bannerViewManager.exportedCustomDirectEventTypeConstants
        Assert.assertEquals(11, directEventMap?.size)
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.AD_RECEIVED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_RECEIVED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.AD_CLICKED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_CLICKED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.AD_OPENED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_OPENED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.AD_CLOSED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_CLOSED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.APP_LEAVE_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.APP_LEAVE_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.BID_RECEIVED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BID_RECEIVED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.BID_FAILED_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BID_FAILED_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_EVENT
            )
        )
        Assert.assertEquals(
            directEventMap?.get(POBSDKPluginConstant.BANNER_BID_EVENT),
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BANNER_BID_EVENT
            )
        )
    }

    @Test
    fun testLoadAd() {
        var isLoaded = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.loadAd("")).then {
            isLoaded = true
            return@then null
        }
        bannerViewManager.setAdUnitDetails(bannerView, "")
        Assert.assertTrue(isLoaded)
    }

    @Test
    fun testOnDropViewInstance() {
        var isDestroyed = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.destroy()).then {
            isDestroyed = true
            return@then null
        }
        bannerViewManager.onDropViewInstance(bannerView)
        Assert.assertTrue(isDestroyed)
    }

    @Test
    fun testForceRefresh() {
        var forceRefreshState = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.forceRefresh(1)).then {
            forceRefreshState = true
            return@then null
        }
        bannerViewManager.forceRefresh(bannerView, 1)
        Assert.assertTrue(forceRefreshState)
    }
    @Test
    fun testProceedToLoadAd() {
        var proceedToLoadAdCall = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.proceedToLoadAd()).then {
            proceedToLoadAdCall = true
            return@then null
        }
        bannerViewManager.proceedToLoadAd(bannerView, 1)
        Assert.assertTrue(proceedToLoadAdCall)
    }
    @Test
    fun testProceedOnError() {
        var proceedOnErrorCall = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.proceedOnError("BidEventErrorBidExpired_1")).then {
            proceedOnErrorCall = true
            return@then null
        }
        bannerViewManager.proceedOnError(bannerView, "BidEventErrorBidExpired_1")
        Assert.assertTrue(proceedOnErrorCall)
    }

    @Test
    fun testAutoRefreshState() {
        var autoRefreshState = false
        val bannerView: POBRNBannerView = Mockito.mock(POBRNBannerView::class.java)
        Mockito.`when`(bannerView.setAutoRefreshState(1)).then {
            autoRefreshState = true
            return@then null
        }
        bannerViewManager.setAutoRefreshState(bannerView, 1)
        Assert.assertTrue(autoRefreshState)
    }

}
