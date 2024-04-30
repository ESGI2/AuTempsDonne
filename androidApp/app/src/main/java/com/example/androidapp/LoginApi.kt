package com.example.androidapp

import org.json.JSONObject

object LoginApi {
    private const val LOGIN_ENDPOINT = "login"

    fun login(email: String, password: String, success: (JSONObject) -> Unit, failure: (String) -> Unit) {
        val requestBody = JSONObject().apply {
            put("email", email)
            put("password", password)
        }

        ApiClient.makePostRequest(LOGIN_ENDPOINT, requestBody, success, failure)
    }
}
