package com.example.android.projectjoao;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.android.projectjoao.data.models.ListResponse;
import com.example.android.projectjoao.data.models.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import retrofit2.Response;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class ListingActivity extends BaseActivity<ListResponse> implements ItemAdapter.ListItemlickListener {
    //Ui elements
    private RecyclerView mItemsList;
    private LinearLayout mLoadingIndicator;
    private LinearLayoutManager layoutManager;

    //List data
    private ItemAdapter mAdapter;
    private List<User> users = new ArrayList<>();

    //Storage between requests
    private String userToken;

    protected int getCorrespondingLayout() {
        return R.layout.activity_listing;
    }

    protected void setSharedPreferences() {
        SharedPreferences pref = getApplicationContext().getSharedPreferences("SharedPreferences", 0);
        userToken = pref.getString("token", null);
    }

    protected void arrangeUiElements() {
        mItemsList = findViewById(R.id.scroll_area);
        mLoadingIndicator = findViewById(R.id.loadingPanel);

        layoutManager = new LinearLayoutManager(this);
        mItemsList.setLayoutManager(layoutManager);
        mAdapter = new ItemAdapter(ListingActivity.this, users);
        mItemsList.setAdapter(mAdapter);
    }

    protected void runActivity() {
        listUsers(0);

        EndlessRecyclerViewScrollListener scrollListener = new EndlessRecyclerViewScrollListener(layoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {
                mLoadingIndicator.setVisibility(View.VISIBLE);
                listUsers(page);
            }
        };

        mItemsList.addOnScrollListener(scrollListener);
    }

    private void listUsers(int page) {
        int WINDOW_SIZE = 20;

        Map<String, Integer> formattedPagination = formatPagination(page, WINDOW_SIZE);

        TaqtileApiHandler apiHandler = NetworkConnection.getConnection();

        Observable<Response<ListResponse>> responseStream = apiHandler.getUsers(userToken, formattedPagination);

        responseStream.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(this::processResponse,
                        Throwable::printStackTrace);
    }

    private Map<String, Integer> formatPagination(int page, int window) {
        String pageParam = "pagination[page]";
        String windowParam = "pagination[window]";
        HashMap<String, Integer> pagination = new HashMap<>();

        pagination.put(pageParam, page);
        pagination.put(windowParam, window);

        return pagination;
    }

    protected void processResponse(Response<ListResponse> listResponse) {
        if (listResponse.code() == HttpsURLConnection.HTTP_OK) {
            ListResponse listData = listResponse.body();
            List<User> moreUsers = new ArrayList<>();

            if (listData != null) {
                moreUsers = listData.getData();
            }

            users.addAll(moreUsers);

            final int currentSize = mAdapter.getItemCount();

            mItemsList.post(() -> {
                mAdapter.notifyItemRangeInserted(currentSize, users.size() - 1);
                mLoadingIndicator.setVisibility(View.INVISIBLE);
            });
        } else if(listResponse.code() == HttpsURLConnection.HTTP_UNAUTHORIZED) {
            showToastOnUserUnauthorized();
        }
        else{
            Toast.makeText(getApplicationContext(), R.string.connection_error, Toast.LENGTH_SHORT).show();
        }
    }

    private void showToastOnUserUnauthorized() {
        Toast.makeText(getApplicationContext(), R.string.expired_user_token, Toast.LENGTH_SHORT).show();

        Intent i = new Intent(ListingActivity.this, MainActivity.class);
        startActivity(i);
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
        else if(selected == android.R.id.home){
            onBackPressed();
        }
        return true;
    }
}
