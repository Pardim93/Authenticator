package com.example.naturaauthexample;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import com.natura.auth.sdk.NaturaAuthSDK;
import com.natura.auth.sdk.exceptions.NaturaAuthSDKException;


public class MainActivity extends AppCompatActivity {
    private Button button;
    private Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = this.findViewById(R.id.open_react_native_module);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openReactNativeModule();
            }
        });
    }

    public void openReactNativeModule() {
      NaturaAuthSDK.getInstance(this).startConfigureActivity(
        "",
        "",
        "",
        "",
        "",
        "",
        "");
    }


  @Override
  protected void onActivityResult(int requestCode, int resultCode,  Intent data) {

    if(NaturaAuthSDK.getInstance(this).isConfigureActivityResult(requestCode)) {
      try{
        NaturaAuthSDK.getInstance(this).getActivityResult(resultCode, data);
        NaturaAuthSDK.getInstance(this).startSignInActivity();
      }
      catch(NaturaAuthSDKException ex) {
        System.out.println(ex.getMessage());
      }
    }
    else if(NaturaAuthSDK.getInstance(this).isSigninActivityResult(requestCode)) {
      try {
        String result = NaturaAuthSDK.getInstance(this).getActivityResult(resultCode, data);
        NaturaAuthSDK.getInstance(this).startGetCurrentCredentialsActivity();
      }
      catch(NaturaAuthSDKException ex){
        System.out.println(ex.getMessage());
      }
    }
    else if(NaturaAuthSDK.getInstance(this).isGetCurrentCredentialsActivityResult(requestCode)) {
      try {
        String result = NaturaAuthSDK.getInstance(this).getActivityResult(resultCode, data);
        System.out.println("credentials: " + result);
        NaturaAuthSDK.getInstance(this).startShowUserActivity();
      }
      catch(NaturaAuthSDKException ex){
        System.out.println(ex.getMessage());
      }
    }
    else if(NaturaAuthSDK.getInstance(this).isShowUserActivityResult(requestCode)) {
      try {
        String result = NaturaAuthSDK.getInstance(this).getActivityResult(resultCode, data);
        NaturaAuthSDK.getInstance(this).startGetCurrentCredentialsActivity();
      }
      catch(NaturaAuthSDKException ex){
        System.out.println(ex.getMessage());
      }
    }

    super.onActivityResult(requestCode, resultCode, data);
  }
}
