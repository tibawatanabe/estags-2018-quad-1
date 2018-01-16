package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.LoginResponse;
import com.example.android.projectjoao.data.models.User;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Response;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {
    //Ui elements
    EditText mUserName;
    EditText mPassword;
    Button mConfirmationButton;

    //Element to connect to the api
    TaqtileApiHandler apiHandler;

    //Storage between requests
    SharedPreferences pref; // 0 - for private mode
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setSharedPreferences();

        getUiElements();

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                requestUserAuthentication();
            }
        });
    }

    private void setSharedPreferences() {
        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0);
        editor  = pref.edit();

        editor.remove("token");
        editor.commit();
    }

    private void getUiElements() {
        mUserName = (EditText) findViewById(R.id.username);
        mPassword = (EditText) findViewById(R.id.password_field);
        mConfirmationButton = (Button) findViewById(R.id.confirmation_button);
    }

    private void requestUserAuthentication() {
        String username = mUserName.getText().toString();
        String password = mPassword.getText().toString();

        if(username.isEmpty() || password.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Preencha todos os dados", Toast.LENGTH_SHORT).show();
        }
        else {
            User user = new User(username, password, false);

            sendUserAuthenticationRequest(user);
        }
    }

    private void sendUserAuthenticationRequest(User user) {
        apiHandler = NetworkConnection.getConnection();

        Observable<Response<LoginResponse>> responseStream = apiHandler.authenticateUser(user);

        responseStream.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(loginResponse -> processResponse(loginResponse),
                        e -> e.printStackTrace());
    }

    private void processResponse(Response<LoginResponse> loginResponse) {
        if(loginResponse.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
            Toast.makeText(getApplicationContext(), "Usuário e/ou senha incorretos...", Toast.LENGTH_SHORT).show();
        }
        else {
            editor.putString("token", loginResponse.body().getLoginData().getToken());
            editor.commit();

            Intent i = new Intent(MainActivity.this, ListingActivity.class);
            startActivity(i);
        }
    }
}
