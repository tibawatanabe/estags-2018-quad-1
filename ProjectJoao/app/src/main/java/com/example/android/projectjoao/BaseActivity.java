package com.example.android.projectjoao;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import retrofit2.Response;

/**
 * Created by taqtile on 16/01/18.
 */

public abstract class BaseActivity<ResponseCode> extends AppCompatActivity {
    static int layout = 0;

    public BaseActivity() {
        layout = setCorrespondingLayout();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(layout);

        setSharedPreferences();

        arrangeUiElements();

        runActivity();
    }

    protected abstract int setCorrespondingLayout();
    protected abstract void setSharedPreferences();
    protected abstract void arrangeUiElements();
    protected abstract void runActivity();
    protected abstract void processResponse(Response<ResponseCode> response);
}
