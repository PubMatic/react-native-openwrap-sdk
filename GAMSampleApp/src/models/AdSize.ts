/**
 * Represents the width and height of an ad.
 */
export class AdSize {
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
 * AdSize constants for standard GAM ad sizes.
 */
export namespace AdSize {
  export const BANNER = new AdSize(320, 50);
  export const MEDIUM_RECTANGLE = new AdSize(300, 250);
  export const FULL_BANNER = new AdSize(468, 60);
}
