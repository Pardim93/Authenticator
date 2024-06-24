package com.natura.auth.sdk.packages;

import android.content.Context;

import com.natura.auth.sdk.modules.NaturaAuthSDKModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class NaturaAuthSDKPackage implements ReactPackage {
  private final Context _context;

  public NaturaAuthSDKPackage(Context context) {
    super();
    _context = context;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new NaturaAuthSDKModule(reactContext));
    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
