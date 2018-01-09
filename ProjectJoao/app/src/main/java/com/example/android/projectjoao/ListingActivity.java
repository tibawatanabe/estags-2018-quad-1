package com.example.android.projectjoao;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.net.ssl.HttpsURLConnection;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ListingActivity extends AppCompatActivity implements ItemAdapter.ListItemlickListener {
    private static final int NUM_LIST_ITENS = 100;
    private ItemAdapter mAdapter;
    private RecyclerView mItemsList;
    private Toast mToast;
    private List<ListData> users;
    private ListAPI listApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listing);

        usersListing();
    }

    @Override
    public void onListItemClick(int clickedItemIndex) {
        if(mToast != null){
            mToast.cancel();
        }

        String toastMessage = "Você clicou no " + users.get(clickedItemIndex).getName();

        mToast = Toast.makeText(this, toastMessage, Toast.LENGTH_LONG);
        mToast.show();
    }

    private void usersListing() {
        SharedPreferences pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        OkHttpClient okHttpClient = new OkHttpClient.Builder().addInterceptor(new Interceptor() {
            @Override
            public okhttp3.Response intercept(Chain chain) throws IOException {
                Request originalRequest = chain.request();

                Request.Builder builder = originalRequest.newBuilder();

                Request newRequest = builder.build();
                return chain.proceed(newRequest);
            }
        }).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(ListAPI.BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        listApi = retrofit.create(ListAPI.class);

        Map<String, Integer> paginationMap = setPagination();

        listApi.getUsers(pref.getString("token", null), paginationMap).enqueue(getUsersCallback);
    }

    private Map<String, Integer> setPagination(){
        String page = "pagination[page]";
        String window = "pagination[window]";
        HashMap<String, Integer> pagination = new HashMap<String, Integer>();

        pagination.put(page, 0);
        pagination.put(window, 100);

        return pagination;
    }

    Callback<ListResponse> getUsersCallback = new Callback<ListResponse>() {
        @Override
        public void onResponse(Call<ListResponse> call, Response<ListResponse> response) {
            if (response.isSuccessful()) {
                ListResponse listResponse = response.body();
                users = listResponse.getData();
                setList();
            } else if(response.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
                Toast.makeText(getApplicationContext(), "Usuário expirou", Toast.LENGTH_SHORT).show();

                Intent i = new Intent(ListingActivity.this, MainActivity.class);
                startActivity(i);
            }
            else{
                Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<ListResponse> call, Throwable t) {
            Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            t.printStackTrace();
        }
    };

    public void setList(){
        mItemsList = (RecyclerView) findViewById(R.id.scroll_area);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mItemsList.setLayoutManager(layoutManager);

        mItemsList.setHasFixedSize(true);

        mAdapter = new ItemAdapter(NUM_LIST_ITENS, this, users);

        mItemsList.setAdapter(mAdapter);
    }
}
