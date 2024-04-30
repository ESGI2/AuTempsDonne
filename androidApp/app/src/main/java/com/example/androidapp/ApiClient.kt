package com.example.androidapp

import android.content.Context
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

object ApiClient {
    private const val BASE_URL = "http://localhost:3000/"
    private var requestQueue: RequestQueue? = null

    fun initialize(context: Context) {
        requestQueue = Volley.newRequestQueue(context)
    }

    fun makePostRequest(endpoint: String, requestBody: JSONObject, success: (JSONObject) -> Unit, failure: (String) -> Unit) {
        val fullUrl = "$BASE_URL$endpoint"
        val jsonObjectRequest = JsonObjectRequest(Request.Method.POST, fullUrl, requestBody,
            { response ->
                success(response)
            }, { error ->
                failure(error.message ?: "Unknown error")
            })

        requestQueue?.add(jsonObjectRequest)
    }
}
