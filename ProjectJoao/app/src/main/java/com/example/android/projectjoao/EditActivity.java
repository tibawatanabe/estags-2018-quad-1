package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.TextInputEditText;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Response;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class EditActivity extends BaseActivity<DefaultResponse> {
    //Ui elements
    private TextInputEditText mUsernameTextInput;
    private TextInputEditText mEmailTextInput;
    private TextInputEditText mRoleTextInput;
    private TextInputEditText mPasswordTextInput;
    private Button mConfirmationButton;

    //User data
    private User user;

    //Network config
    private TaqtileApiHandler apiHandler;
    private String userToken;

    //Shared intent
    private Intent intent;

    protected int getCorrespondingLayout() {
        return R.layout.user_form;
    }

    protected void setSharedPreferences() {
        SharedPreferences pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode
        userToken = pref.getString("token", null);
    }

    public void arrangeUiElements() {
        mUsernameTextInput = findViewById(R.id.create_name_entry);
        mEmailTextInput = findViewById(R.id.create_email_entry);
        mRoleTextInput = findViewById(R.id.create_role_entry);
        mPasswordTextInput = findViewById(R.id.create_password_entry);
        mConfirmationButton = findViewById(R.id.create_confirmation_button);

        intent = getIntent();
        mUsernameTextInput.setText(intent.getStringExtra("username"));
        mEmailTextInput.setText(intent.getStringExtra("email"));
        mRoleTextInput.setText(intent.getStringExtra("role"));
    }

    public void runActivity() {
        mConfirmationButton.setOnClickListener(v -> {
            String username = mUsernameTextInput.getText().toString();
            String email = mEmailTextInput.getText().toString();
            String role = mRoleTextInput.getText().toString();
            String password = mPasswordTextInput.getText().toString();

            if(username.isEmpty() || email.isEmpty() || role.isEmpty() || password.isEmpty()){
                Toast.makeText(getApplicationContext(), R.string.update_user_missing_data, Toast.LENGTH_SHORT).show();
            }
            else {
                user = new User(username, email, role, password);

                int userId = Integer.valueOf(intent.getStringExtra("id"));

                apiHandler = NetworkConnection.getConnection();

                Observable<Response<DefaultResponse>> responseStream = apiHandler.editUser(userToken, userId, user);

                responseStream.subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(this::processResponse,
                                Throwable::printStackTrace);
            }
        });
    }

    protected void processResponse(Response<DefaultResponse> deleteResponse) {
        if (deleteResponse.isSuccessful()) {
            int userId = 0;
            DefaultResponse defaultResponse = deleteResponse.body();
            if(defaultResponse != null){
                userId = defaultResponse.getData().getId();
            }

            Toast.makeText(getApplicationContext(), R.string.update_user_successful_operation, Toast.LENGTH_SHORT).show();
            intent = new Intent(EditActivity.this, ShowActivity.class);
            intent.putExtra("id", String.valueOf(userId));
            startActivity(intent);
        } else if(deleteResponse.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
            Toast.makeText(getApplicationContext(), R.string.expired_user_token, Toast.LENGTH_SHORT).show();

            intent = new Intent(EditActivity.this, MainActivity.class);
            startActivity(intent);
        }
        else{
            Toast.makeText(getApplicationContext(), R.string.connection_error, Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int selected = item.getItemId();
            if(selected == android.R.id.home) {
                onBackPressed();
            }
        return true;
    }
}
