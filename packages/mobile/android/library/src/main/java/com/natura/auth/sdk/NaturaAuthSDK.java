package com.natura.auth.sdk;

import android.app.Activity;
import android.content.Intent;
import android.content.Context;

import com.natura.auth.sdk.activities.NaturaAuthSDKActivity;
import com.natura.auth.sdk.exceptions.NaturaAuthSDKException;

public class NaturaAuthSDK {

  private Activity context;
  private static NaturaAuthSDK instance;

  private static int CONFIGURE_REQUEST_CODE = 0;
  private static int SIGNIN_REQUEST_CODE = 1;
  private static int SHOW_USER_REQUEST_CODE = 2;
  private static int SIGNOUT_REQUEST_CODE = 3;
  private static int GET_CURRENT_CREDENTIALS_REQUEST_CODE = 4;

  private NaturaAuthSDK(Activity applicationContext) {
    this.context = applicationContext;
  }

  public static NaturaAuthSDK getInstance(Activity applicationContext) {
    if (instance == null) {
      instance = new NaturaAuthSDK(applicationContext);
    }
    return instance;
  }

  public boolean isConfigureActivityResult(int requestCode) {
    return requestCode == CONFIGURE_REQUEST_CODE;
  }

  public boolean isSigninActivityResult(int requestCode) {
    return requestCode == SIGNIN_REQUEST_CODE;
  }

  public boolean isSignOutActivityResult(int requestCode) {
    return requestCode == SIGNOUT_REQUEST_CODE;
  }

  public boolean isGetCurrentCredentialsActivityResult(int requestCode) {
    return requestCode == GET_CURRENT_CREDENTIALS_REQUEST_CODE;
  }

  public boolean isShowUserActivityResult(int requestCode) {
    return requestCode == SHOW_USER_REQUEST_CODE;
  }

  public void startConfigureActivity(String company, String clientId , String clientSecret, String region, String environment, String country, String language) {
    Intent intent = this.createIntent(NaturaAuthSDKActivity.class);
    intent.putExtra("company", company);
    intent.putExtra("clientId", clientId);
    intent.putExtra("clientSecret", clientSecret);
    intent.putExtra("region", region);
    intent.putExtra("environment", environment);
    intent.putExtra("country", country);
    intent.putExtra("language", language);
    this.setIntentSDKAction(intent, "Configure");
    this.context.startActivityForResult(intent, CONFIGURE_REQUEST_CODE);
  }

  public void startSignInActivity() {
    Intent intent = this.createIntent(NaturaAuthSDKActivity.class);
    this.setIntentSDKAction(intent, "SignIn");
    this.context.startActivityForResult(intent, SIGNIN_REQUEST_CODE);
  }

  public void startSignOutActivity() {
    Intent intent = this.createIntent(NaturaAuthSDKActivity.class);
    this.setIntentSDKAction(intent, "SignOut");
    this.context.startActivityForResult(intent, SIGNOUT_REQUEST_CODE);
  }

  public void startGetCurrentCredentialsActivity() {
    Intent intent = this.createIntent(NaturaAuthSDKActivity.class);
    this.setIntentSDKAction(intent, "CurrentCredentials");
    this.context.startActivityForResult(intent, GET_CURRENT_CREDENTIALS_REQUEST_CODE);
  }

  public void startShowUserActivity() {
    Intent intent = this.createIntent(NaturaAuthSDKActivity.class);
    this.setIntentSDKAction(intent, "TestUser");
    this.context.startActivityForResult(intent, SHOW_USER_REQUEST_CODE);
  }

  public String getActivityResult(int resultCode, Intent data) throws NaturaAuthSDKException {
    String response = this.getActivityResponse(data);
    if(resultCode == Activity.RESULT_CANCELED) {
      throw new NaturaAuthSDKException(response);
    }
    return response;
  }

  private void setIntentSDKAction(Intent intent, String action) {
    intent.putExtra("SDKAction", action);
  }

  private Intent createIntent(Class<?> cl) {
    Intent intent = new Intent(this.context, cl);
    return intent;
  }

  private String getActivityResponse(Intent data) {
    return data.getStringExtra("sdkResponse");
  }
}
