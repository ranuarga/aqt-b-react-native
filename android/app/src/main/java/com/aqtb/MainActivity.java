package com.aqtb;

import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import android.os.Build;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    int themeId = R.style.SplashStatusBarTheme;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
      switch (Build.MANUFACTURER) {
        case "Xiaomi":
          themeId = R.style.SplashStatusBarThemeXiaomi;
          break;
        default:
          break;
      }
    }

    SplashScreen.show(this, themeId);
    super.onCreate(savedInstanceState);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AQTB";
  }
}
