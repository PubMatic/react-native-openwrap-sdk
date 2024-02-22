import { POBError } from '../../models/POBError';

describe('POBError', () => {
    it('testPOBError', () => {
        const errorCode = 1001;
        const errorMessage = 'Test error message';
        const error = new POBError(errorCode, errorMessage);

        expect(error).toBeInstanceOf(POBError);
        expect(error.errorCode).toBe(errorCode);
        expect(error.errorMessage).toBe(errorMessage);
    });

    it('testToString', () => {
        const errorCode = 1001;
        const errorMessage = 'Test error message';
        const error = new POBError(errorCode, errorMessage);

        expect(error.toString()).toBe(`POBError{errorCode=${errorCode}, errorMessage='${errorMessage}'}`);
    });

    it('testErrorCodes', () => {
        expect(POBError.INVALID_REQUEST).toBe(1001);
        expect(POBError.NO_ADS_AVAILABLE).toBe(1002);
    });
});
