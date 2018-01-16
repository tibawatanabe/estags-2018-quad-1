package com.example.android.projectjoao.data.models;

import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ListResponse {

    @SerializedName("data")
    @Expose
    private List<User> data = null;
    @SerializedName("pagination")
    @Expose
    private Pagination pagination;

    public List<User> getData() {
        return data;
    }

    public void setData(List<User> data) {
        this.data = data;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

}
