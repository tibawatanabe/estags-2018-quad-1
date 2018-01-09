package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    EditText mUserName;

    EditText mPassword;

    Button mConfirmationButton;

    LoginAPI loginApi;

    SharedPreferences pref; // 0 - for private mode
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0);
        editor  = pref.edit();

        editor.remove("token");
        editor.commit();

        mUserName = (EditText) findViewById(R.id.username);

        mPassword = (EditText) findViewById(R.id.password_field);

        mConfirmationButton = (Button) findViewById(R.id.confirmation_button);

        userAuthentication();

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String username = mUserName.getText().toString();
                String password = mPassword.getText().toString();

                User user = new User();
                user.setEmail(username);
                user.setPassword(password);
                user.setRememberMe(false);
                loginApi.authenticateUser(user).enqueue(userAuthenticationCallback);
            }
        });
    }

    private void userAuthentication(){
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
                .baseUrl(LoginAPI.BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loginApi = retrofit.create(LoginAPI.class);
    }

    Callback<LoginResponse> userAuthenticationCallback = new Callback<LoginResponse>() {
        @Override
        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
            if (response.isSuccessful()) {
                LoginResponse loginResponse = response.body();

                editor.putString("token", loginResponse.getLoginData().getToken());
                editor.commit();

                Toast.makeText(getApplicationContext(), "Redirecionando...", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(MainActivity.this, ListingActivity.class);
                startActivity(i);
            } else {
                Toast.makeText(getApplicationContext(), "Usuário e/ou senha incorretos...", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<LoginResponse> call, Throwable t) {
            t.printStackTrace();
        }
    };
}
