package com.example.android.projectjoao;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

public class ListingActivity extends AppCompatActivity implements ItemAdapter.ListItemlickListener {
    private static final int NUM_LIST_ITENS = 100;
    private ItemAdapter mAdapter;
    private RecyclerView mItemsList;
    private Toast mToast;
    private String[] names = {"Joao", "Matheus", "Pedro", "Kim", "Jonathan", "Joao 1", "Matheus", "Pedro", "Kim", "Jonathan", "Joao 2", "Matheus", "Pedro", "Kim", "Jonathan", "Joao 3", "Matheus", "Pedro", "Kim", "Jonathan"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listing);

        mItemsList = (RecyclerView) findViewById(R.id.scroll_area);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mItemsList.setLayoutManager(layoutManager);

        mItemsList.setHasFixedSize(true);

        mAdapter = new ItemAdapter(NUM_LIST_ITENS, this, names);

        mItemsList.setAdapter(mAdapter);
    }

    @Override
    public void onListItemClick(int clickedItemIndex) {
        if(mToast != null){
            mToast.cancel();
        }

        String toastMessage = "Você clicou no " + names[clickedItemIndex];

        mToast = Toast.makeText(this, toastMessage, Toast.LENGTH_LONG);
        mToast.show();
    }
}
