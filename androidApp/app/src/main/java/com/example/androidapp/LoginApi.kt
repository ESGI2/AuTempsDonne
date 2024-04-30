package com.example.androidapp

import io.ktor.client.statement.*
import io.ktor.http.*

object LoginApi {
    private const val LOGIN_ENDPOINT = "login"

    suspend fun login(email: String, password: String): HttpResponse {
        val requestBody = mapOf(
            "email" to email,
            "password" to password
        )

        return ApiClient.makePostRequest(LOGIN_ENDPOINT, requestBody)
    }
}
