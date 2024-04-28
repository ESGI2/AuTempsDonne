package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {

    private val loginApi = LoginApi

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        val emailEditText = findViewById<EditText>(R.id.emailEditText)
        val passwordEditText = findViewById<EditText>(R.id.passwordEditText)
        val loginButton = findViewById<Button>(R.id.loginButton)

        loginButton.setOnClickListener {
            val email = emailEditText.text.toString()
            val password = passwordEditText.text.toString()

            authenticateUser(email, password)
        }
    }

    private fun authenticateUser(email: String, password: String) {
        val response = loginApi.login(email, password)

        if (response.isSuccessful) {
            val accessToken = response.headers["jwt"]?.get(0)
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("ACCESS_TOKEN", accessToken)
            startActivity(intent)
            finish()
        } else {
            val errorBody = response.body?.string()
            Toast.makeText(this, "Erreur d'authentification : $errorBody", Toast.LENGTH_SHORT).show()
        }
    }
}