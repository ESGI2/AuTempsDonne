package com.example.androidapp

import android.content.Context
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

class NetworkService(private val context: Context) {
    private val queue = Volley.newRequestQueue(context)
    private val cookies = hashMapOf<String, String>()

    fun makeRequest(url: String, successCallback: (String) -> Unit, errorCallback: (String) -> Unit) {
        val stringRequest = object : StringRequest(Method.GET, url,
            Response.Listener<String> { response ->
                successCallback(response)
            },
            Response.ErrorListener { error ->
                errorCallback("Error: ${error.message}")
            }) {
            override fun getHeaders(): MutableMap<String, String> = hashMapOf<String, String>().apply {
                cookies[url]?.let { put("Cookie", it) }
            }

            override fun deliverResponse(response: String) {
                // Try to extract the cookie from the response headers if it is set
                headers["Set-Cookie"]?.let {
                    val cookie = it.split(";")[0] // Take only the session id part of the cookie
                    cookies[url] = cookie
                }
                super.deliverResponse(response)
            }
        }

        queue.add(stringRequest)
    }
}
