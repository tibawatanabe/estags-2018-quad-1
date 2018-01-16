package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

import retrofit2.Response;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class CreateActivity extends BaseActivity<DefaultResponse> {
    //Ui elements
    private TextInputEditText mUsernameTextInput;
    private TextInputEditText mEmailTextInput;
    private TextInputEditText mRoleTextInput;
    private TextInputEditText mPasswordTextInput;
    private Button mConfirmationButton;

    //Network config
    private TaqtileApiHandler apiHandler;

    //Storage between requests
    private SharedPreferences pref;

    protected int setCorrespondingLayout() {
        return R.layout.user_form;
    }

    protected void setSharedPreferences() {
        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0);
    }

    protected void arrangeUiElements() {
        mUsernameTextInput = (TextInputEditText) findViewById(R.id.create_name_entry);
        mEmailTextInput = (TextInputEditText) findViewById(R.id.create_email_entry);
        mRoleTextInput = (TextInputEditText) findViewById(R.id.create_role_entry);
        mPasswordTextInput = (TextInputEditText) findViewById(R.id.create_password_entry);
        mConfirmationButton = (Button) findViewById(R.id.create_confirmation_button);
    }

    public void runActivity() {
        mConfirmationButton.setOnClickListener(view -> {
            String username = mUsernameTextInput.getText().toString();
            String email = mEmailTextInput.getText().toString();
            String role = mRoleTextInput.getText().toString();
            String password = mPasswordTextInput.getText().toString();

            if(username.isEmpty() || email.isEmpty() || role.isEmpty() || password.isEmpty()){
                Toast.makeText(getApplicationContext(), R.string.create_user_empty_data, Toast.LENGTH_SHORT).show();
            }
            else {
                String userToken = pref.getString("token", null);

                User user = new User(username, email, role, password);

                apiHandler = NetworkConnection.getConnection();

                Observable<Response<DefaultResponse>> responseStream = apiHandler.createUser(userToken, user);

                responseStream.subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(loginResponse -> processResponse(loginResponse),
                                e -> e.printStackTrace());
            }
        });
    }

    protected void processResponse(Response<DefaultResponse> createResponse) {
        if (createResponse.isSuccessful()) {
            Toast.makeText(getApplicationContext(), R.string.create_user_success_response, Toast.LENGTH_SHORT).show();
            Intent i = new Intent(CreateActivity.this, ListingActivity.class);
            startActivity(i);
        } else {
            Toast.makeText(getApplicationContext(), R.string.create_user_fail_response, Toast.LENGTH_SHORT).show();
        }
    }
}
