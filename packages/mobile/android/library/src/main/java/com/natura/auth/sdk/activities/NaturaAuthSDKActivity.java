package com.natura.auth.sdk.activities;

import android.os.Bundle;

import android.content.Intent;

import androidx.appcompat.app.AppCompatActivity;

import com.natura.auth.sdk.managers.NaturaAuthSDKInstanceManager;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.soloader.SoLoader;

public class NaturaAuthSDKActivity extends AppCompatActivity
  implements DefaultHardwareBackBtnHandler {

  public static NaturaAuthSDKActivity lastInstance;

  private ReactRootView reactRootView;

  private static final String REACT_MODULE_NAME = "NaturaAuthSDK";

  private Bundle getInitialProperties() {
    return this.getIntent().getExtras();
  }

  private ReactInstanceManager getReactInstanceManager() {
    return NaturaAuthSDKInstanceManager.getReactInstanceManager(this.getApplication());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    try {
      SoLoader.init(this, false);
      this.reactRootView = new ReactRootView(this);
      this.reactRootView.startReactApplication(this.getReactInstanceManager(), REACT_MODULE_NAME, this.getInitialProperties());
      this.setContentView(this.reactRootView);
      lastInstance = this;
    } catch (Exception error) {
      this.finish();
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    this.getReactInstanceManager().onActivityResult(this, requestCode, resultCode, data);
  }

  @Override
  public void onBackPressed() {
    this.getReactInstanceManager().onBackPressed();
  }

  @Override
  public void invokeDefaultOnBackPressed() {
    super.onBackPressed();
  }
}
