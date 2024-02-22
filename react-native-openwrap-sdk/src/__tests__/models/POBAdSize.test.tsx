import { POBAdSize } from '../../models/POBAdSize';
describe('POBAdSize test verification', () => {
  test('test constructor', () => {
    let adSize = new POBAdSize(320, 50);
    expect(320).toBe(adSize.width);
    expect(50).toBe(adSize.height);
  });

  test('test constructor with 0 witdh and height values', () => {
    let adSize = new POBAdSize(0, 0);
    expect(0).toBe(adSize.width);
    expect(0).toBe(adSize.height);
  });

  test('should return the correct string representation', () => {
    const adSize = new POBAdSize(320, 50);
    expect(adSize.toString()).toBe('320x50');
  });

  test('verify all the constants', () => {
    let adSize = POBAdSize.BANNER_SIZE_320x50;
    expect(320).toBe(adSize.width);
    expect(50).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_300x250;
    expect(300).toBe(adSize.width);
    expect(250).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_120x600;
    expect(120).toBe(adSize.width);
    expect(600).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_250x250;
    expect(250).toBe(adSize.width);
    expect(250).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_320x100;
    expect(320).toBe(adSize.width);
    expect(100).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_468x60;
    expect(468).toBe(adSize.width);
    expect(60).toBe(adSize.height);

    adSize = POBAdSize.BANNER_SIZE_728x90;
    expect(728).toBe(adSize.width);
    expect(90).toBe(adSize.height);
  });
});
