/**
 * Provides setters to pass user information
 */
export class POBUserInfo {
  /**
   * The year of birth in YYYY format.
   * Example :
   * adRequest.setBirthYear(1988);
   */
  birthYear?: number;

  /**
   * Set the user gender,
   * Possible options are:
   * OTHER
   * MALE,
   * FEMALE
   */
  gender?: POBUserInfo.Gender;

  /**
   * Country code using ISO-3166-1-alpha-3.
   */
  country?: string;

  /**
   * City of user
   */
  city?: string;

  /**
   * Google metro code, You can set Designated market area (DMA) code of the user in this
   * field. This field is applicable for US users only
   */
  metro?: string;

  /**
   * The user's zip code may be useful in delivering geographically relevant ads
   */
  zip?: string;

  /**
   * Region code using ISO-3166-2; 2-letter state code if USA
   */
  region?: string;

  /**
   * Comma separated list of keywords, interests, or intent.
   */
  keywords?: string;

  /**
   * Sets the comma separated list of keywords, interests, or intent.
   *
   * @param keywords Comma separated list of keywords, interests, or intent.
   */
  public setKeywords(keywords: string) {
    this.keywords = keywords;
  }

  /**
   * The year of birth in YYYY format.
   * Example :
   * setBirthYear(1988);
   *
   * @param birthYear birth year of user
   */
  public setBirthYear(birthYear: number) {
    if (birthYear > 0) {
      this.birthYear = birthYear;
    }
  }

  /**
   * Set the user gender,
   * Possible options are:
   * OTHER
   * MALE,
   * FEMALE
   *
   * @param gender User's gender
   */
  public setGender(gender: POBUserInfo.Gender) {
    this.gender = gender;
  }

  /**
   * Set the user country. Country code using ISO-3166-1-alpha-3.
   * For example: for United State Of America, you can use setCountry("USA");
   *
   * @param country User's country
   */
  public setCountry(country: string) {
    this.country = country;
  }

  /**
   * Sets city of user
   * For example: setCity("London");
   *
   * @param city City of user
   */
  public setCity(city: string) {
    this.city = city;
  }

  /**
   * Sets metro / DMA.
   * For example, New York, NY is also known as 501. Los Angeles, CA, on the other hand has been
   * assigned the number 803.
   *
   * @param metro Metro / DMA code of the user.
   */
  public setMetro(metro: string) {
    this.metro = metro;
  }

  /**
   * Sets the user's zip or postal code. This may be useful in delivering geographically relevant
   * ads
   * For example: for Redwood city, CA use setZip("94063");
   *
   * @param zip user's zip code
   */
  public setZip(zip: string) {
    this.zip = zip;
  }

  /**
   * Sets the user's region. Region code using ISO-3166-2; 2-letter state code if USA.
   * For example: for France you can use "FR"
   *
   * @param region user's region.
   */
  public setRegion(region: string) {
    this.region = region;
  }
}

export namespace POBUserInfo {
  export enum Gender {
    OTHER = 0,
    MALE = 1,
    FEMALE = 2,
  }
}
