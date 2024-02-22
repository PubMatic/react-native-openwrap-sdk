import { POBInterstitial } from "./POBInterstitial";

/**
 * Static member class for interaction with the POBInterstitial instance for video events.
 * These events will only invoked for VAST based video creative.
 * All methods are guaranteed to occur on the main thread.
 */
export interface POBVideoListener {
    /**
     * Notifies the listener that the playback of the video ad has been completed.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onVideoPlaybackCompleted(ad: POBInterstitial): void;
}
