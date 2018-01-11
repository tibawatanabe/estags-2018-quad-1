package com.example.android.projectjoao;

import com.example.android.projectjoao.model.ListResponse;
import com.example.android.projectjoao.model.LoginResponse;
import com.example.android.projectjoao.model.ShowResponse;
import com.example.android.projectjoao.model.User;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;

public interface TaqtileApiHandler {
    String BASE_URL = "http://tq-template-node.herokuapp.com/";

    @POST("authenticate")
    Call<LoginResponse> authenticateUser(@Body User user);

    @GET("users")
    Call<ListResponse> getUsers(@Header("Authorization") String token, @QueryMap Map<String, Integer> pagination);

    @GET("user/{id}")
    Call<ShowResponse> getUser(@Header("Authorization") String token, @Path("id") int id);
}
