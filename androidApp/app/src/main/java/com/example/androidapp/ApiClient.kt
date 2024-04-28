package com.example.androidapp

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory




object ApiClient {
    private const val BASE_URL = "http://localhost:3000/login"

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val loginApi: LoginApi = retrofit.create(LoginApi::class.java)
}
