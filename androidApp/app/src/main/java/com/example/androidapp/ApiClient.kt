package com.example.androidapp
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.Response

object ApiClient {
    private const val BASE_URL = "http://localhost:3000/login"

    private val client = OkHttpClient()

    fun makeRequest(endpoint: String, requestBody: RequestBody? = null): Response {
        val request = Request.Builder()
            .url("$BASE_URL/$endpoint")
            .apply {
                if (requestBody != null) {
                    post(requestBody)
                }
            }
            .build()

        return client.newCall(request).execute()
    }
}