package com.example.android.projectjoao;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface ListAPI {
    String BASE_URL = "http://tq-template-node.herokuapp.com/";

    @GET("/users/")
    Call<ListResponse> getUsers(@Header("Authorization") String token, @QueryMap Map<String, Integer> pagination);
}
