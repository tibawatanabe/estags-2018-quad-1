package com.example.android.projectjoao;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {
    EditText mUserName;

    EditText mPassword;

    Button mConfirmationButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mUserName = (EditText) findViewById(R.id.username);

        mPassword = (EditText) findViewById(R.id.password_field);
    }

    public void authenticate(View v) {
        String username = mUserName.getText().toString();
        String password = mPassword.getText().toString();

        try {
            URL url = new URL("http://tq-template-node.herokuapp.com/authenticate/");
            new userAuthentication().execute(username, password);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    public class userAuthentication extends AsyncTask<String, Void, Boolean>{
        @Override
        protected Boolean doInBackground(String... strings) {
            String urlString = strings[0]; // URL to call

            String email = strings[1];
            String password = strings[2];

            OutputStream out = null;

            try {
                URL url = new URL(urlString);

                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("POST");
                urlConnection.setDoOutput(true);
                urlConnection.setChunkedStreamingMode(0);

                out = new BufferedOutputStream(urlConnection.getOutputStream());

                BufferedWriter writer = new BufferedWriter (new OutputStreamWriter(out, "UTF-8"));

                writer.write(data);

                writer.flush();

                writer.close();

                out.close();

                urlConnection.connect();

                int responseCode = urlConnection.getResponseCode();

                InputStream in = new BufferedInputStream(urlConnection.getInputStream());


            } catch (Exception e) {

                System.out.println(e.getMessage());



            }
            return null;
        }
    }
}
