package com.example.android.projectjoao;

import android.app.ListActivity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

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

        mConfirmationButton = (Button) findViewById(R.id.confirmation_button);

        mConfirmationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String url = "http://tq-template-node.herokuapp.com/authenticate/";
                String username = mUserName.getText().toString();
                String password = mPassword.getText().toString();
                new userAuthentication().execute(url, username, password);
            }
        });
    }

    public class userAuthentication extends AsyncTask<String, Void, Boolean>{
        @Override
        protected Boolean doInBackground(String... strings) {
            String urlString = strings[0];
            String email = strings[1];
            String password = strings[2];

            OutputStream out = null;

            try {
                URL url = new URL(urlString);

                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setDoOutput(true);
                urlConnection.setRequestMethod("POST");
                urlConnection.setChunkedStreamingMode(0);
                urlConnection.setRequestProperty("Content-Type", "application/json");

                out = new BufferedOutputStream(urlConnection.getOutputStream());

                JSONObject jsonObject = new JSONObject();
                jsonObject.accumulate("email", email);
                jsonObject.accumulate("password", password);
                jsonObject.accumulate("rememberMe", false);

                BufferedWriter writer = new BufferedWriter (new OutputStreamWriter(out, "UTF-8"));
                writer.write(jsonObject.toString());
                writer.flush();
                writer.close();
                out.close();

                urlConnection.connect();

                final int responseCode = urlConnection.getResponseCode();

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (responseCode == HttpsURLConnection.HTTP_OK) {
                            Toast.makeText(getApplicationContext(), "Redirecionando...", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(MainActivity.this, ListingActivity.class));

                        } else {
                            Toast.makeText(getApplicationContext(), "Usuário e/ou senha incorretos...", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            return null;
        }
    }
}
