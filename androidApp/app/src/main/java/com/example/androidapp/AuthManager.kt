package com.example.androidapp

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley

class AuthManager(private val context: Context) {
    private val sharedPreferences = context.getSharedPreferences("AuthPrefs", Context.MODE_PRIVATE)
    private val authTokenKey = "authToken"

    fun isUserAuthenticated(): Boolean {
        val authToken = sharedPreferences.getString(authTokenKey, null)
        return authToken != null
    }

    fun login(email: String, password: String, callback: (success: Boolean) -> Unit) {
        val queue = Volley.newRequestQueue(context)
        val url = "http://213.199.38.64:3000/login"

        val params = HashMap<String, String>()
        params["email"] = email
        params["password"] = password

        val request = object : JsonObjectRequest(
            Method.POST, url, null,
            Response.Listener { response ->
                val success = response.optBoolean("success")
                val authToken = response.optString("authToken", null)

                if (success && authToken != null) {
                    sharedPreferences.edit().putString(authTokenKey, authToken).apply()
                    callback(true)
                } else {
                    callback(false)
                }
            },
            Response.ErrorListener { error ->
                Log.e("AuthManager", "Login error: ${error.message}")
                callback(false)
            }
        ) {
            override fun getParams(): Map<String, String> {
                return params
            }
        }

        queue.add(request)
    }

    fun logout() {
        sharedPreferences.edit().remove(authTokenKey).apply()
    }

    fun getUserInfo(callback: (userInfo: UserInfo?) -> Unit) {
        val queue = Volley.newRequestQueue(context)
        val url = "http://213.199.38.64:3000/user/me"
        val authToken = sharedPreferences.getString(authTokenKey, null)

        if (authToken != null) {
            val request = object : JsonObjectRequest(
                Request.Method.GET, url, null,
                Response.Listener { response ->
                    val firstName = response.optString("firstName")
                    val lastName = response.optString("lastName")
                    val email = response.optString("email")
                    val phone = response.optString("phone")
                    val status = response.optString("status")
                    val role = response.optString("role")
                    val userInfo = UserInfo(firstName, lastName, email, phone, status, role)
                    callback(userInfo)
                },
                Response.ErrorListener { error ->
                    Log.e("AuthManager", "Get user info error: ${error.message}")
                    callback(null)
                }
            ) {
                override fun getHeaders(): MutableMap<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = "Bearer $authToken"
                    return headers
                }
            }

            queue.add(request)
        } else {
            callback(null)
        }
    }
}

data class UserInfo(val firstName: String, val lastName: String, val email: String, val phone: String, val status: String, val role: String)