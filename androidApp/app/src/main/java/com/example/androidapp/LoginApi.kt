package com.example.androidapp

import okhttp3.FormBody
import okhttp3.RequestBody
import okhttp3.Response

object LoginApi {
    private const val LOGIN_ENDPOINT = "http://localhost:3000/login"

    fun login(email: String, password: String): Response {
        val requestBody: RequestBody = FormBody.Builder()
            .add("email", email)
            .add("password", password)
            .build()

        return ApiClient.makePostRequest(LOGIN_ENDPOINT, requestBody)
    }
}