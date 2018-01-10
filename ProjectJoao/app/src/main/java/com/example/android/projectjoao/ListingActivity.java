package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.example.android.projectjoao.model.ListData;
import com.example.android.projectjoao.model.ListResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ListingActivity extends AppCompatActivity implements ItemAdapter.ListItemlickListener {
    private ItemAdapter mAdapter;
    private RecyclerView mItemsList;
    private Toast mToast;
    private List<ListData> users;
    private TaqtileApiHandler apiHandler;
    private EndlessRecyclerViewScrollListener scrollListener;
    private SharedPreferences pref;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listing);

        pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0); // 0 - for private mode

        apiHandler = NetworkConnection.getConnection();

        setList();
    }

    public void setList() {
        mItemsList = (RecyclerView) findViewById(R.id.scroll_area);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mItemsList.setLayoutManager(layoutManager);

        listUsers(0, 20, initialUsersCallback);

        scrollListener = new EndlessRecyclerViewScrollListener(layoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {
                listUsers(page, 20, additionalUsersCallback);
            }
        };

        mItemsList.addOnScrollListener(scrollListener);
    }

    private void listUsers(int page, int window, Callback<ListResponse> callback) {
        Map<String, Integer> formattedPagination = formatPagination(page, window);

        String userToken = pref.getString("token", null);

        Call<ListResponse> call = apiHandler.getUsers(userToken, formattedPagination);

        call.enqueue(callback);
    }

    private Map<String, Integer> formatPagination(int page, int window) {
        String pageParam = "pagination[page]";
        String windowParam = "pagination[window]";
        HashMap<String, Integer> pagination = new HashMap<>();

        pagination.put(pageParam, page);
        pagination.put(windowParam, window);

        return pagination;
    }

    Callback<ListResponse> initialUsersCallback = new Callback<ListResponse>() {
            @Override
            public void onResponse(Call<ListResponse> call, Response<ListResponse> response) {
                if (response.isSuccessful()) {
                    ListResponse listResponse = response.body();
                    users = listResponse.getData();
                    mAdapter = new ItemAdapter(ListingActivity.this, users);
                    mItemsList.setAdapter(mAdapter);
                } else if(response.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
                    showToastOnUserUnauthorized();
                }
                else{
                    Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ListResponse> call, Throwable t) {
                showToastOnUserFailure(t);
            }
        };

    Callback<ListResponse> additionalUsersCallback = new Callback<ListResponse>() {
            @Override
            public void onResponse(Call<ListResponse> call, Response<ListResponse> response) {
                if (response.isSuccessful()) {
                    ListResponse listResponse = response.body();
                    List<ListData> moreUsers = listResponse.getData();
                    final int currentSize = mAdapter.getItemCount();
                    users.addAll(moreUsers);

                    mItemsList.post(new Runnable() {
                        @Override
                        public void run() {
                            mAdapter.notifyItemRangeInserted(currentSize, users.size() - 1);
                        }
                    });
                } else if(response.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
                    showToastOnUserUnauthorized();
                }
                else{
                    Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ListResponse> call, Throwable t) {
                showToastOnUserFailure(t);
            }
        };

    private void showToastOnUserUnauthorized() {
        Toast.makeText(getApplicationContext(), "Usuário expirou", Toast.LENGTH_SHORT).show();

        Intent i = new Intent(ListingActivity.this, MainActivity.class);
        startActivity(i);
    }

    private void showToastOnUserFailure(Throwable t) {
        Toast.makeText(getApplicationContext(), "Erro na conexão", Toast.LENGTH_SHORT).show();
        t.printStackTrace();
    }

    @Override
    public void onListItemClick(int clickedItemIndex) {
        Intent i = new Intent(ListingActivity.this, ShowActivity.class);
        i.putExtra("id", String.valueOf(users.get(clickedItemIndex).getId()));
        startActivity(i);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_create_user, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int selected = item.getItemId();
        if(selected == R.id.create_user) {
            Intent i = new Intent(ListingActivity.this, CreateActivity.class);
            startActivity(i);
        }
        return true;
    }
}
