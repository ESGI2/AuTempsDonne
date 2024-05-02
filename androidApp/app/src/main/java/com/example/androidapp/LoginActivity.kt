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
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONException
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

        val stringRequest = object : StringRequest(
            Request.Method.POST, "http://213.199.38.64:3000/login",
            Response.Listener<String> { response ->
                progressBar.visibility = ProgressBar.INVISIBLE
                Log.d("LoginActivity", "Response: $response")
                try {
                    val jsonObject = JSONObject(response)
                    val message = jsonObject.getString("Message")
                    val role = jsonObject.getString("Role")
                    Toast.makeText(this@LoginActivity, "Login Successful: $message, Role: $role", Toast.LENGTH_LONG).show()

                    val intent = Intent(this@LoginActivity, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } catch (e: JSONException) {
                    e.printStackTrace()
                    Log.e("LoginActivity", "JSON parsing error: " + e.message)
                    Toast.makeText(this@LoginActivity, "Error parsing response", Toast.LENGTH_LONG).show()
                }
            },
            Response.ErrorListener { error ->
                progressBar.visibility = ProgressBar.INVISIBLE
                error.printStackTrace()
                Log.e("LoginActivity", "Volley error: " + error.message)
                Toast.makeText(this@LoginActivity, "Network Error: $error", Toast.LENGTH_LONG).show()
            }) {
            override fun getParams(): Map<String, String> {
                val params = HashMap<String, String>()
                params["email"] = email
                params["password"] = password
                return params
            }
        }

        queue.add(stringRequest)
    }
}
