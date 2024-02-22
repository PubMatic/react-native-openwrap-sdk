/**
 * OpenWrap Bid errors with its details.
 * Pass the appropriate error message along with {@link POBBidEventListener.onBidFailed}
 */
export class POBBidError {
    public errorCode: POBBidError.POBBidErrorCode;
    public errorMessage: string;

    constructor(errorCode: POBBidError.POBBidErrorCode, errorMessage: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public toString(): string {
        return `POBBidError{errorCode=${this.errorCode}, errorMessage='${this.errorMessage}'}`;
    }
}

export namespace POBBidError {
    /**
     * Error Code
     */
    export enum POBBidErrorCode {
        /**
         * Client side auction loss error.
         */
        CLIENT_SIDE_AUCTION_LOSS,
        /**
         * Bid has expired.
         */
        BID_EXPIRED,
        /**
         * Othe reasons for failure.
         */
        OTHER,
    }
}
