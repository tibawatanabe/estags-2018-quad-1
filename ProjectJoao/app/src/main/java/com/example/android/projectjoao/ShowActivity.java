package com.example.android.projectjoao;

import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Response;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class ShowActivity extends BaseActivity<DefaultResponse> {
    //Ui elements
    private TextView mUsernameTextView;
    private TextView mIdTextView;
    private TextView mEmailTextView;
    private TextView mRoleTextView;
    private TextView mCreatedAtTextView;
    private TextView mUpdatedAtTextView;
    private TaqtileApiHandler apiHandler;
    private DialogFragment newFragment;

    //User data
    private User user;

    //Network config
    private String userToken;

    protected int getCorrespondingLayout() {
        return R.layout.activity_show;
    }

    protected void setSharedPreferences() {
        SharedPreferences pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0);
        userToken = pref.getString("token", null);
    }

    protected void arrangeUiElements() {
        mUsernameTextView = findViewById(R.id.name);
        mIdTextView = findViewById(R.id.id);
        mEmailTextView = findViewById(R.id.email);
        mRoleTextView = findViewById(R.id.role);
        mCreatedAtTextView = findViewById(R.id.created_at);
        mUpdatedAtTextView = findViewById(R.id.updated_at);
    }

    protected void runActivity() {
        Intent intent = getIntent();
        String id = intent.getStringExtra("id");

        apiHandler = NetworkConnection.getConnection();

        Observable<Response<DefaultResponse>> responseStream = apiHandler.getUser(userToken, Integer.valueOf(id));

        responseStream.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(this::processResponse,
                        Throwable::printStackTrace);
    }

    protected void processResponse(Response<DefaultResponse> showResponse) {
        if (showResponse.isSuccessful()) {
            DefaultResponse defaultResponse = showResponse.body();
            if (defaultResponse != null) {
                user = defaultResponse.getData();
            }

            showUserInformation(user);
        } else if(showResponse.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
            Toast.makeText(getApplicationContext(), R.string.expired_user_token, Toast.LENGTH_SHORT).show();

            Intent i = new Intent(ShowActivity.this, MainActivity.class);
            startActivity(i);
        }
        else{
            Toast.makeText(getApplicationContext(), R.string.connection_error, Toast.LENGTH_SHORT).show();
        }
    }

    private void showUserInformation(User user) {
        Resources res = getResources();

        String textId = res.getString(R.string.show_user_id_text, user.getId());
        String textEmail = res.getString(R.string.show_user_email_text, user.getEmail());
        String textRole = res.getString(R.string.show_user_role_text, user.getRole());
        String textCreatedAt = res.getString(R.string.show_user_created_at_text, user.getCreatedAt());
        String textUpdatedAt = res.getString(R.string.show_user_updated_at_text, user.getUpdatedAt());

        mUsernameTextView.setText(user.getName());
        mIdTextView.setText(textId);
        mEmailTextView.setText(textEmail);
        mRoleTextView.setText(textRole);
        mCreatedAtTextView.setText(textCreatedAt);
        mUpdatedAtTextView.setText(textUpdatedAt);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_edit_user, menu);
        inflater.inflate(R.menu.menu_delete_user, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int selected = item.getItemId();
        switch (selected) {
            case R.id.edit_user:
                Intent i = new Intent(ShowActivity.this, EditActivity.class);
                i.putExtra("id", String.valueOf(user.getId()));
                i.putExtra("username", String.valueOf(user.getName()));
                i.putExtra("email", String.valueOf(user.getEmail()));
                i.putExtra("role", String.valueOf(user.getRole()));
                startActivity(i);
                break;
            case R.id.delete_user:
                newFragment = new DeleteUserDialogFragment();
                FragmentManager fm = getFragmentManager();
                newFragment.show(fm, "dialog");
                break;
            case android.R.id.home:
                onBackPressed();
                break;
        }
        return true;
    }

    public void doPositiveClick() {
        int id = user.getId();
        Observable<Response<DefaultResponse>> responseStream = apiHandler.deleteUser(userToken, id);
        responseStream.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(this::deleteUser,
                        Throwable::printStackTrace);
    }

    private void deleteUser(Response<DefaultResponse> deleteResponse) {
        if(deleteResponse.isSuccessful()) {
            newFragment.dismiss();
            Intent i = new Intent(ShowActivity.this, ListingActivity.class);
            startActivity(i);
            Toast.makeText(getApplicationContext(), R.string.delete_user_successful_text, Toast.LENGTH_SHORT).show();
        }
        else {
            Toast.makeText(getApplicationContext(), R.string.delete_user_failed_text, Toast.LENGTH_SHORT).show();
        }
    }

    public void doNegativeClick() {
        newFragment.dismiss();
    }
}
