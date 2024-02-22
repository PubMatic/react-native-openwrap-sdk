import { POBBidError } from '../../models/POBBidError';

describe('POBBidError', () => {
  it('testPOBBidError', () => {
    const errorCode = POBBidError.POBBidErrorCode.BID_EXPIRED;
    const errorMessage = 'Bid Expired';
    const error = new POBBidError(errorCode, errorMessage);

    expect(error).toBeInstanceOf(POBBidError);
    expect(error.errorCode).toBe(errorCode);
    expect(error.errorMessage).toBe(errorMessage);
  });

  it('testToString', () => {
    const errorCode = POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS;
    const errorMessage = 'Test error message';
    const error = new POBBidError(errorCode, errorMessage);

    expect(error.toString()).toBe(
      `POBBidError{errorCode=${errorCode}, errorMessage='${errorMessage}'}`
    );
  });

  it('testErrorCodes', () => {
    expect(POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS).toBe(0);
    expect(POBBidError.POBBidErrorCode.BID_EXPIRED).toBe(1);
    expect(POBBidError.POBBidErrorCode.OTHER).toBe(2);
  });
});
