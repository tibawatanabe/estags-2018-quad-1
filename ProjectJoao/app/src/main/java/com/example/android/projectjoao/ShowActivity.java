package com.example.android.projectjoao;

import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.DefaultResponse;
import com.example.android.projectjoao.data.models.User;

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
    private SharedPreferences pref;
    private DialogFragment newFragment;

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

        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        apiHandler = NetworkConnection.getConnection();

        apiHandler.getUser(pref.getString("token", null), Integer.valueOf(id)).enqueue(getUserCallback);
    }

    Callback<DefaultResponse> getUserCallback = new Callback<DefaultResponse>() {
        @Override
        public void onResponse(Call<DefaultResponse> call, Response<DefaultResponse> response) {
            if (response.isSuccessful()) {
                DefaultResponse defaultResponse = response.body();
                user = defaultResponse.getData();

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
        public void onFailure(Call<DefaultResponse> call, Throwable t) {
            Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
            t.printStackTrace();
        }
    };

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
        apiHandler.deleteUser(pref.getString("token", null), Integer.valueOf(id)).enqueue(deleteUserCallback);
    }

    public void doNegativeClick() {
        newFragment.dismiss();
    }

    Callback<DefaultResponse> deleteUserCallback = new Callback<DefaultResponse>() {
        @Override
        public void onResponse(Call<DefaultResponse> call, Response<DefaultResponse> response) {
            if(response.isSuccessful()) {
                newFragment.dismiss();
                Intent i = new Intent(ShowActivity.this, ListingActivity.class);
                startActivity(i);
                Toast.makeText(getApplicationContext(), "Usuário removido com sucesso", Toast.LENGTH_SHORT).show();
            }
            else {
                Toast.makeText(getApplicationContext(), "Não foi possível remover o usuário", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<DefaultResponse> call, Throwable t) {
            t.printStackTrace();
        }
    };
}
