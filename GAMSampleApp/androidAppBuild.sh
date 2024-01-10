#!/bin/sh
# From the project directory of your react-native project
mkdir -p android/app/src/main/assets/
# Create an android asset file in the directory created with the 
# name 'index.android.bundle' and go back to the project directory
cd android/app/src/main/assets/ && > index.android.bundle
cd -
# Bundle the Android Assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
# Remove existing build
rm -rf android/app/build
# Go to android folder and issue gradle command to assemble
# 'assembleDebug' for debug build, 'assembleRelease' for release
# release build involve sigining your APK, for test automation of 
# development code usually the debugBuild is good enough 
cd android && ./gradlew clean assembleDebug && cd ..
# If all the steps are successful, your APK which won't require a 
# metro instance running to render the UI would be available at 
# android/app/build/outputs/apk/debug/app-debug.apk