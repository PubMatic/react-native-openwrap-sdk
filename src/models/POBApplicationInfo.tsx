/**
 * Provides setters to pass application information like store URL, domain, IAB categories etc.
 * It is very important to provide transparency for buyers of your app inventory.
 */
export class POBApplicationInfo {
  /**
   * Indicates the domain of the mobile application (e.g., "mygame.foo.com")
   */
  domain?: string;

  /**
   * URL of application on Play store
   */
  storeUrl?: URL;

  /**
   * Indicates whether the mobile application is a paid version or not. Possible values are:
   * false - Free version
   * true - Paid version
   */
  paid?: boolean;

  /**
   * Comma separated list of IAB categories for the application. e.g. "IAB-1, IAB-2"
   */
  categories?: string;

  /**
   * Comma separated list of keywords about the app
   */
  keywords?: string;

  /**
   * Sets the comma separated list of keywords about the application
   *
   * @param keywords Comma separated list of keywords about the app
   */
  public setKeywords(keywords: string) {
    this.keywords = keywords;
  }

  /**
   * Sets the domain of the mobile application (e.g., &quot;mygame.foo.com&quot;)
   *
   * @param domain application domain
   */
  public setDomain(domain: string) {
    this.domain = domain;
  }

  /**
   * Sets URL of application on Play store. It is mandatory to pass a valid storeURL. It is very
   * important for platform identification.
   *
   * @param storeUrl Play store URL of app
   */
  public setStoreURL(storeUrl: URL) {
    this.storeUrl = storeUrl;
  }

  /**
   * Sets whether the mobile application is a paid version or not. Possible values are:
   * false - Free version
   * true - Paid version
   *
   * @param paid state of application paid status
   */
  public setPaid(paid: boolean) {
    this.paid = paid;
  }

  /**
   * Sets IAB category for the application. e.g. "IAB-1, IAB-2".
   *
   * @param categories Comma separated list of IAB categories for the application. e.g. "IAB-1, IAB-2"
   */
  public setCategories(categories: string) {
    this.categories = categories;
  }
}
