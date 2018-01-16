package com.example.android.projectjoao;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkConnection {
    public static TaqtileApiHandler getConnection(){
//        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
//
//        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient.Builder okHttpClient = new OkHttpClient.Builder();

        okHttpClient.addInterceptor(chain -> {
            Request originalRequest = chain.request();

            Request.Builder builder = originalRequest.newBuilder();

            Request newRequest = builder.build();
            return chain.proceed(newRequest);
        });

//        okHttpClient.addInterceptor(logging);

        Retrofit retrofit = new Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .client(okHttpClient.build())
                .baseUrl(TaqtileApiHandler.BASE_URL)
                .build();

        return retrofit.create(TaqtileApiHandler.class);
    }
}
