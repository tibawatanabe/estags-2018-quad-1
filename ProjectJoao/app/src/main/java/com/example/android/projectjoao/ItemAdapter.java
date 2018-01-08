package com.example.android.projectjoao;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.ItemViewHolder> {
    private static final String TAG = ItemAdapter.class.getSimpleName();
    private String[] mDataset;

    final private ListItemlickListener mOnClickListener;

    private int mNumberItems;

    public interface ListItemlickListener{
        void onListItemClick(int clickedItemIndex);
    }

    public ItemAdapter(int numberOfItems, ListItemlickListener listener, String[] myDataSet) {
        mNumberItems = numberOfItems;
        mOnClickListener = listener;
        mDataset = myDataSet;
    }

    @Override
    public ItemViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        Context context = viewGroup.getContext();
        int layoutIdForListItem = R.layout.list_item;
        LayoutInflater inflater = LayoutInflater.from(context);
        boolean shouldAttachToParentImmediately = false;

        View view = inflater.inflate(layoutIdForListItem, viewGroup, shouldAttachToParentImmediately);
        ItemViewHolder viewHolder = new ItemViewHolder(view);

        return viewHolder;
    }

    @Override
    public void onBindViewHolder(ItemViewHolder holder, int position) {
        holder.bind(mDataset[position]);
    }

    @Override
    public int getItemCount() {
        return mDataset.length;
    }

    class ItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView listItemView;

        public ItemViewHolder(View itemView) {
            super(itemView);

            listItemView = (TextView) itemView.findViewById(R.id.list_item);
            itemView.setOnClickListener(this);
        }

        void bind(String name) {
            listItemView.setText(String.valueOf(name));
        }

        @Override
        public void onClick(View view) {
            int clickedPosition = getAdapterPosition();
            mOnClickListener.onListItemClick(clickedPosition);
        }
    }
}
