package com.example.android.projectjoao.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CreateResponse {
    @SerializedName("data")
    @Expose
    private User data;

    public User getCreateData() {
        return data;
    }

    public void setCreateData(User createData) {
        this.data = createData;
    }
}
