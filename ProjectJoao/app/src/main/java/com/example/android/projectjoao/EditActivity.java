package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditActivity extends AppCompatActivity {
    private User user;
    private TextInputEditText mUsernameTextInput;
    private TextInputEditText mEmailTextInput;
    private TextInputEditText mRoleTextInput;
    private TextInputEditText mPasswordTextInput;
    private Button mConfirmationButton;
    private TaqtileApiHandler apiHandler;
    private SharedPreferences pref;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_form);

        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        apiHandler = NetworkConnection.getConnection();

        setUiComponents();

        editUser();
    }

    public void setUiComponents() {
        mUsernameTextInput = (TextInputEditText) findViewById(R.id.create_name_entry);
        mEmailTextInput = (TextInputEditText) findViewById(R.id.create_email_entry);
        mRoleTextInput = (TextInputEditText) findViewById(R.id.create_role_entry);
        mPasswordTextInput = (TextInputEditText) findViewById(R.id.create_password_entry);
        mConfirmationButton = (Button) findViewById(R.id.create_confirmation_button);
    }

    public void editUser() {
        final Intent intent = getIntent();
        mUsernameTextInput.setText(intent.getStringExtra("username"));
        mEmailTextInput.setText(intent.getStringExtra("email"));
        mRoleTextInput.setText(intent.getStringExtra("role"));

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String username = mUsernameTextInput.getText().toString();
                String email = mEmailTextInput.getText().toString();
                String role = mRoleTextInput.getText().toString();
                String password = mPasswordTextInput.getText().toString();

                if(username.isEmpty() || email.isEmpty() || role.isEmpty() || password.isEmpty()){
                    Toast.makeText(getApplicationContext(), "Todos os dados são obrigatórios", Toast.LENGTH_SHORT).show();
                }
                else {
                    String userToken = pref.getString("token", null);

                    user = new User();
                    user.setName(username);
                    user.setEmail(email);
                    user.setRole(role);
                    user.setPassword(password);

                    int userId = Integer.valueOf(intent.getStringExtra("id"));

                    apiHandler.editUser(userToken, userId, user).enqueue(userEditionCallback);
                }
            }
        });
    }

    Callback<DefaultResponse> userEditionCallback = new Callback<DefaultResponse>() {
        @Override
        public void onResponse(Call<DefaultResponse> call, Response<DefaultResponse> response) {
            if (response.isSuccessful()) {
                int userId = response.body().getData().getId();

                Toast.makeText(getApplicationContext(), "Usuário atualizado com sucesso", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(EditActivity.this, ShowActivity.class);
                i.putExtra("id", String.valueOf(userId));
                startActivity(i);
            } else if(response.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
                Toast.makeText(getApplicationContext(), "Usuário expirou", Toast.LENGTH_SHORT).show();

                Intent i = new Intent(EditActivity.this, MainActivity.class);
                startActivity(i);
            }
            else{
                Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<DefaultResponse> call, Throwable t) {
            Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            t.printStackTrace();
        }
    };

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int selected = item.getItemId();
            if(selected == android.R.id.home) {
                onBackPressed();
            }
        return true;
    }
}
