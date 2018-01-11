package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.android.projectjoao.model.CreateResponse;
import com.example.android.projectjoao.model.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateActivity extends AppCompatActivity {
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
        setContentView(R.layout.activity_create);

        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        apiHandler = NetworkConnection.getConnection();

        createUser();
    }

    public void createUser() {
        mUsernameTextInput = (TextInputEditText) findViewById(R.id.create_name_entry);
        mEmailTextInput = (TextInputEditText) findViewById(R.id.create_email_entry);
        mRoleTextInput = (TextInputEditText) findViewById(R.id.create_role_entry);
        mPasswordTextInput = (TextInputEditText) findViewById(R.id.create_password_entry);
        mConfirmationButton = (Button) findViewById(R.id.create_confirmation_button);

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String username = mUsernameTextInput.getText().toString();
                String email = mEmailTextInput.getText().toString();
                String role = mRoleTextInput.getText().toString();
                String password = mPasswordTextInput.getText().toString();

                if(username.isEmpty() || email.isEmpty() || role.isEmpty() || password.isEmpty()){
                    Toast.makeText(getApplicationContext(), "Insira todos os dados do usuário", Toast.LENGTH_SHORT).show();
                }
                else {
                    String userToken = pref.getString("token", null);

                    User user = new User();
                    user.setName(username);
                    user.setEmail(email);
                    user.setRole(role);
                    user.setPassword(password);

                    apiHandler.createUser(userToken, user).enqueue(userCreationCallback);
                }
            }
        });
    }

    Callback<CreateResponse> userCreationCallback = new Callback<CreateResponse>() {
        @Override
        public void onResponse(Call<CreateResponse> call, Response<CreateResponse> response) {
            if (response.isSuccessful()) {
                User user = response.body().getCreateData();
                Log.d("ID", user.getId().toString());
                Toast.makeText(getApplicationContext(), "Usuário criado com sucesso", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(CreateActivity.this, ListingActivity.class);
                startActivity(i);
            } else {
                Toast.makeText(getApplicationContext(), "Não foi possível criar o usuário", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<CreateResponse> call, Throwable t) {
            t.printStackTrace();
        }
    };
}
