package com.example.android.projectjoao;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.projectjoao.model.ListData;

import java.util.List;

public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.ItemViewHolder> {
    private static final String TAG = ItemAdapter.class.getSimpleName();
    private List<ListData> mDataset;

    final private ListItemlickListener mOnClickListener;

    public ItemAdapter(ListItemlickListener listener, List<ListData> myDataSet) {
        mOnClickListener = listener;
        mDataset = myDataSet;
    }

    public interface ListItemlickListener{
        void onListItemClick(int clickedItemIndex);
    }

    public class ItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView listItemView;

        public ItemViewHolder(View itemView) {
            super(itemView);

            listItemView = (TextView) itemView.findViewById(R.id.list_item);
            itemView.setOnClickListener(this);
        }

        void bind(ListData user) {
            listItemView.setText(String.valueOf(user.getEmail()));
        }

        @Override
        public void onClick(View view) {
            int clickedPosition = getAdapterPosition();
            mOnClickListener.onListItemClick(clickedPosition);
        }
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
        holder.bind(mDataset.get(position));
    }

    @Override
    public int getItemCount() {
        if (mDataset != null) {
            return mDataset.size();
        }
        else {
            return 0;
        }
    }
}
