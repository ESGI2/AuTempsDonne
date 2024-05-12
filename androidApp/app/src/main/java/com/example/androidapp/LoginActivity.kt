package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class LoginActivity : AppCompatActivity() {

    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        loginButton = findViewById(R.id.loginButton)
        progressBar = findViewById(R.id.progressBar)
        progressBar.visibility = ProgressBar.INVISIBLE

        loginButton.setOnClickListener {
            loginUser()
        }
    }

    private fun loginUser() {
        val email = emailEditText.text.toString().trim()
        val password = passwordEditText.text.toString()

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Veuillez entrer l'email et le mot de passe", Toast.LENGTH_SHORT).show()
            return
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            Toast.makeText(this, "Veuillez entrer un email valide", Toast.LENGTH_SHORT).show()
            return
        }

        progressBar.visibility = ProgressBar.VISIBLE
        val queue = Volley.newRequestQueue(this)

        val url = "http://213.199.38.64:3000/login"
        val params = mapOf("email" to email, "password" to password)

        val jsonRequest = JsonObjectRequest(
            Request.Method.POST, url, JSONObject(params as Map<*, *>),
            { response ->
                progressBar.visibility = ProgressBar.INVISIBLE
                val message = response.optString("Message")
                val role = response.optString("Role")
                Toast.makeText(
                    this@LoginActivity,
                    "Login Successful: $message, Role: $role",
                    Toast.LENGTH_LONG
                ).show()

                startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                finish()
            },
            { error ->
                progressBar.visibility = ProgressBar.INVISIBLE
                Log.e("LoginActivity", "Volley error: $error")
                Toast.makeText(this@LoginActivity, "Network Error: $error", Toast.LENGTH_LONG)
                    .show()
            }
        )

        queue.add(jsonRequest)
    }
}