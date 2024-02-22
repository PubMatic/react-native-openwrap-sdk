/**
 * Represents the width and height of an ad.
 */
export class POBAdSize {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toString(): string {
    return `${this.width}x${this.height}`;
  }
}

/**
 * POBAdSize constants for standard OpenWrap ad sizes.
 */
export namespace POBAdSize {
  export const BANNER_SIZE_320x50 = new POBAdSize(320, 50);
  export const BANNER_SIZE_320x100 = new POBAdSize(320, 100);
  export const BANNER_SIZE_300x250 = new POBAdSize(300, 250);
  export const BANNER_SIZE_250x250 = new POBAdSize(250, 250);
  export const BANNER_SIZE_468x60 = new POBAdSize(468, 60);
  export const BANNER_SIZE_728x90 = new POBAdSize(728, 90);
  export const BANNER_SIZE_120x600 = new POBAdSize(120, 600);
}
