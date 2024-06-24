package com.natura.auth.sdk.modules;

import com.natura.auth.sdk.activities.NaturaAuthSDKActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Context;
import android.content.Intent;
import android.app.Activity;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;


public class NaturaAuthSDKModule extends ReactContextBaseJavaModule {
  public ReactApplicationContext reactContext;
  public static  ReactApplicationContext reactContextStatic;

  public NaturaAuthSDKModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContextStatic = reactContext;
  }

  @Override
  public String getName() {
    return "NaturaAuthSDKModule";
  }

  @ReactMethod
  public void finishWithSuccess(String response) {
    finish(Activity.RESULT_OK, response);
  }

  @ReactMethod
  public void finishWithError(String response) {
    finish(Activity.RESULT_CANCELED, response);
  }

  @ReactMethod
  public void finish(int resultCode, String response) {
    if (NaturaAuthSDKActivity.lastInstance != null) {
      Intent output = new Intent();
      output.putExtra("sdkResponse", response);
      NaturaAuthSDKActivity.lastInstance.setResult(resultCode, output);
      NaturaAuthSDKActivity.lastInstance.finish();
    }
  }
}
