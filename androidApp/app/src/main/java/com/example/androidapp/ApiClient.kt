package com.example.androidapp

import io.ktor.client.*
import io.ktor.client.engine.android.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.call.*
import io.ktor.client.statement.HttpResponse
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*

object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:3000/"  // Use this IP for Android emulator to access localhost

    private val client = HttpClient(Android) {
        install(ContentNegotiation) {
            json()
        }
    }

    suspend fun makePostRequest(endpoint: String, requestBody: Any): HttpResponse {
        return client.post("$BASE_URL$endpoint") {
            contentType(ContentType.Application.Json)
            setBody(requestBody)
        }
    }
}
