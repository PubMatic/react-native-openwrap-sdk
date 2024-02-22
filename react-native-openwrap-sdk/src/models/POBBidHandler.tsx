/**
 * Interface definition with bid functionary handling methods.
 * This interface will be implemented by all ad view class
 * for `Get bid price` feature configuration.
 */
export interface POBBidHandler {
    /**
     * Checks if the bid associated with this reference has expired.
     * Returns a Promise that resolves with a boolean value indicating
     * the bid expiry status (true if expired, false if still valid).
     */
    isBidExpired(): Promise<Boolean>;
}
