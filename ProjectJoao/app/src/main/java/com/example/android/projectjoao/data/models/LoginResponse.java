package com.example.android.projectjoao.data.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginResponse {
    @SerializedName("data")
    @Expose
    private LoginData data;

    public LoginData getLoginData() {
        return data;
    }

    public void setLoginData(LoginData loginData) {
        this.data = loginData;
    }
}