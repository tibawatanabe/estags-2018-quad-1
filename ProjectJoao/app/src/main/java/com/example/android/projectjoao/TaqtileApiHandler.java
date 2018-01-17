package com.example.android.projectjoao;

import com.example.android.projectjoao.data.models.ListResponse;
import com.example.android.projectjoao.data.models.LoginResponse;
import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

import java.util.Map;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;
import rx.Observable;

public interface TaqtileApiHandler {
    String BASE_URL = "http://tq-template-node.herokuapp.com/";

    @POST("authenticate")
    Observable<Response<LoginResponse>> authenticateUser(@Body User user);

    @GET("users")
    Observable<Response<ListResponse>> getUsers(@Header("Authorization") String token, @QueryMap Map<String, Integer> pagination);

    @GET("user/{id}")
    Observable<Response<DefaultResponse>> getUser(@Header("Authorization") String token, @Path("id") int id);

    @POST("user")
    Observable<Response<DefaultResponse>> createUser(@Header("Authorization") String token, @Body User user);

    @DELETE("user/{id}")
    Observable<Response<DefaultResponse>> deleteUser(@Header("Authorization") String token, @Path("id") int id);

    @PUT("user/{id}")
    Observable<Response<DefaultResponse>> editUser(@Header("Authorization") String token, @Path("id") int id, @Body User user);
}
