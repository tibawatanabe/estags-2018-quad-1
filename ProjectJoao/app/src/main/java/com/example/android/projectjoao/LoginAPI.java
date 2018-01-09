package com.example.android.projectjoao;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface LoginAPI {
    String BASE_URL = "http://tq-template-node.herokuapp.com/";

    @POST("authenticate")
    Call<LoginResponse> authenticateUser(@Body User user);
}
