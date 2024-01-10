package com.pubmatic.sdk.openwrap.reactnative

/**
 * Maintains OpenWrap SDK Plugin constants
 */
internal object SDKPluginConstant {


    const val KEYWORDS_KEY = "keywords"

    const val KEY_SDK_VERSION = "ow_sdk_version"

    //region: AppInfo keys
    const val APP_INFO_DOMAIN_KEY = "domain"
    const val APP_INFO_STORE_URL_KEY = "storeUrl"
    const val APP_INFO_IS_PAID_KEY = "paid"
    const val APP_INFO_CATEGORIES_KEY = "categories"
    //endregion

    //region: Location keys
    const val LOCATION_LATITUDE_KEY = "latitude"
    const val LOCATION_LONGITUTE_KEY = "longitude"
    const val LOCATOIN_SOURCE_KEY = "source"
    //endregion

    //region: UserInfo keys
    const val USER_INFO_CITY_KEY = "city"
    const val USER_INFO_BIRTH_YEAR_KEY = "birthYear"
    const val LOCATION_COUNTRY_KEY = "country"
    const val USER_INFO_METRO_KEY = "metro"
    const val USER_INFO_REGION_KEY = "region"
    const val LOCATOIN_ZIP_KEY = "zip"
    const val USER_INFO_GENDER_KEY = "gender"
    //region: UserInfo Gender keys
    const val GENDER_OTHER = 0
    const val GENDER_MALE = 1
    const val GENDER_FEMALE = 2
    //endregion
    //endregion

    //region: OpenWrapSDKModule keys
    const val APP_INFO_WARN_MSG = "Unable to set Application Info for value "
    const val LOCATION_WARN_MSG = "Unable to set Location for value "
    const val USERINFO_WARN_MSG = "Unable to set User Info for value "
    //endregion
}