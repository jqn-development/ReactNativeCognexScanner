# ReactNativeCognexScanner

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

- Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS

- for iOS
  - run `react-native run-ios`
- for Android
  - Run Genymotion
  - run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard. Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard. [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:

1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!

## Cognex Barcode Scanner SDK React Native integration

API reference: https://www.npmjs.com/package/cmbsdk-react-native

This is also available here https://cmbdn.cognex.com/v2.1.x/knowledge/react-nat/integrating-cmbsdk-ios-react-native-component

### cmbSDK iOS React Native integration

- First add the CocoaAsyncSocket dependency using CocoaPods

  https://cocoapods.org/

  https://github.com/robbiehanson/CocoaAsyncSocket

  ```
  // Create a podfile inside the ios directory inside your project
  $ pod init
  ```

- Add the dependency to your Podfile

  ```
  // Podfile
  # Uncomment the next line to define a global platform for your project

  platform :ios, '9.0'

  target 'ReactNativeCognex' do

    # Uncomment the next line if you're using Swift or would like to use dynamic frameworks

    <!-- Currently use frameworks produces 'React/RCTDefines.h' file not found leave it commented out -->

    # use_frameworks!

    # See http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#configuring-cocoapods-dependencies

    pod 'React', :path => '../node_modules/react-native', :subspecs => [
      'Core',
      'CxxBridge', # Include this for RN >= 0.47
      'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
      'RCTText',
      'RCTNetwork',
      'RCTWebSocket', # Needed for debugging
      'RCTAnimation', # Needed for FlatList and animations running on native UI thread
      # Add any other subspecs you want to use in your project
    ]

    # Explicitly include Yoga if you are using RN >= 0.42.0

    pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
    pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

    pod 'CocoaAsyncSocket'

    pod 'RNCmbSdk', :path => '../node_modules/cmbsdk-react-native'

  end

  post_install do |installer|
    installer.pods_project.targets.each do |target|
      if target.name == "React"
        target.remove_from_project
      end
    end
  end
  ```

* Install dependencies

  `$ pod install`

* Make sure to always open the Xcode workspace instead of the project file when building your project:

  `$ open App.xcworkspace`

* Add the "NSCameraUsageDescription" key with a description on how your app will use the camera (for example: Scanning barcodes").

* Install cmbsdk dependency with npm

  `$ npm install cmbsdk-react-native --save`

* Link it

  `$ react-native link cmbsdk-react-native`

---

### cmbSDK Android React Native integration

- Download the cmbSDK React-Native zip archive from the download page

  https://cmbdn.cognex.com/download

- Open the yourRNApp/android/app/ directory, create a new folder named "libs" if there isn't one already, and create it. Place the file "cmbsdklib-release.aar" inside the libs folder. This aar can be found in "Android/cmbsdk-android-binary" from the downloaded zip file.

- Open the app build.gradle located in yourRNApp/android/app and add these lines:

```
...

// Add this lines above dependencies
repositories {
    flatDir {
        dirs 'libs'
    }
}

* Open the build.gradle located in yourRNApp/android and change the minSdkVersion to 19 or above


```

This package produces the followind error due to AndroidX migration

`Attribute application@appComponentFactory value=(android.support.v4.app.CoreComponentFactory) from [com.android.support:support-compat:28.0.0] AndroidManifest.xml:22:18-91 is also present at [androidx.core:core:1.0.0] AndroidManifest.xml`

To fix it migrate your project to AndroidX by adding the following to gragle.properties

```
android.useAndroidX=true
android.enableJetifier=true
```

Install `$ npm install --save @jumpn/react-native-jetifier` to make the migration process automatic

Add the following to your package.json

```
{
  "scripts": {
    "postinstall": "npx react-native-jetifier"
  }
}
```

--
