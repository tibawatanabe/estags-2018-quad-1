package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android.projectjoao.model.ShowResponse;
import com.example.android.projectjoao.model.User;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ShowActivity extends AppCompatActivity {
    private TaqtileApiHandler apiHandler;
    private User user;
    private TextView mUsernameTextView;
    private TextView mIdTextView;
    private TextView mEmailTextView;
    private TextView mRoleTextView;
    private TextView mCreatedAtTextView;
    private TextView mUpdatedAtTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show);

        mUsernameTextView = (TextView) findViewById(R.id.name);
        mIdTextView = (TextView) findViewById(R.id.id);
        mEmailTextView = (TextView) findViewById(R.id.email);
        mRoleTextView = (TextView) findViewById(R.id.role);
        mCreatedAtTextView = (TextView) findViewById(R.id.created_at);
        mUpdatedAtTextView = (TextView) findViewById(R.id.updated_at);

        Intent intent = getIntent();
        String id = intent.getStringExtra("id");

        SharedPreferences pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        apiHandler = NetworkConnection.getConnection();

        apiHandler.getUser(pref.getString("token", null), Integer.valueOf(id)).enqueue(getUserCallback);
    }

    Callback<ShowResponse> getUserCallback = new Callback<ShowResponse>() {
        @Override
        public void onResponse(Call<ShowResponse> call, Response<ShowResponse> response) {
            if (response.isSuccessful()) {
                ShowResponse showResponse = response.body();
                user = showResponse.getData();

                mUsernameTextView.setText(user.getName());
                mIdTextView.setText("Id: " + user.getId().toString());
                mEmailTextView.setText("Email: " + user.getEmail());
                mRoleTextView.setText("Cargo: " + user.getRole());
                mCreatedAtTextView.setText("Criado em: " + user.getCreatedAt());
                mUpdatedAtTextView.setText("Atualizado em: " + user.getUpdatedAt());
            } else if(response.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
                Toast.makeText(getApplicationContext(), "Usuário expirou", Toast.LENGTH_SHORT).show();

                Intent i = new Intent(ShowActivity.this, MainActivity.class);
                startActivity(i);
            }
            else{
                Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<ShowResponse> call, Throwable t) {
            Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            t.printStackTrace();
        }
    };
}
