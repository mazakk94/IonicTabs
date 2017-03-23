# IonicTabs

## Configurations
cordova plugin add:
  - cordova-plugin-contacts
  - cordova-plugin-android-permissions
  - cordova-plugin-compat

## Installations & Builds

### PATH_TO_IONIC_PROJ >

#### build & run on Google Chrome
ionic build && ionic serve

#### build & run on own Device
ionic build android && ionic run android

#### build & run on own Device with plugins reset
ionic state reset && cordova platform add android && ionic build android && ionic run android



### ADB
### PATH_TO_SDK\Android\sdk\platform-tools >
adb devices

#### when device seems to be offline (adb devices)
adb kill-server

#### install apk on device and emulated device
adb install "PATH_TO_IONIC_PROJ\platforms\android\build\outputs\apk\android-debug.apk"

#### very important plugin
ionic plugin add https://github.com/b-alidra/-cordova-imagePickerEx.git --save

#### install built apk on device 
PATH_TO_SDK\Android\sdk\platform-tools\adb.exe install android-debug.apk
