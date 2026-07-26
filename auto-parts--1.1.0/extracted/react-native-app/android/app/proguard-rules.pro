# Keep React Native and Firebase startup classes stable in release builds.
-keep class com.facebook.react.** { *; }
-keep class com.google.firebase.** { *; }
-keep class com.autoparts.app.** { *; }
-dontwarn com.facebook.react.**
-dontwarn com.google.firebase.**
