package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.android.projectjoao.model.LoginResponse;
import com.example.android.projectjoao.model.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    EditText mUserName;

    EditText mPassword;

    Button mConfirmationButton;

    TaqtileApiHandler apiHandler;

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

        apiHandler = NetworkConnection.getConnection();

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String username = mUserName.getText().toString();
                String password = mPassword.getText().toString();

                User user = new User();
                user.setEmail(username);
                user.setPassword(password);
                user.setRememberMe(false);
                apiHandler.authenticateUser(user).enqueue(userAuthenticationCallback);
            }
        });
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
