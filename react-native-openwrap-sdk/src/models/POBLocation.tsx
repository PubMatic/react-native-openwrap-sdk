/**
 * A data class representing a geographic location consist of latitude, longitude and location
 * source.
 */
export class POBLocation {
  /**
   * lattitude of the location
   */
  latitude: number;

  /**
   * longitude of the location
   */
  longitude: number;

  source: POBLocation.Source;

  /**
   * Instantiate an object of POBLocation using the location source defined {@link Source}
   *
   * @param locationSource location source
   * @param latitude       accepts latitude of the location
   * @param longitude      accepts longitude of the location
   */
  constructor(
    locationSource: POBLocation.Source,
    latitude: number,
    longitude: number
  ) {
    this.source = locationSource;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export namespace POBLocation {
  /**
   * Enum to define the location source.
   */
  export enum Source {
    /**
     * Indicates that location is inferred using the Android APIs
     */
    GPS = 1,
    /**
     * Indicates that location is inferred using IP address
     */
    IP_ADDRESS = 2,
    /**
     * Indicates that location is provided by application user.
     */
    USER = 3,
  }
}
