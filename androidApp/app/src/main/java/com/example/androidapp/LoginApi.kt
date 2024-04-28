package com.example.androidapp
import com.example.androidapp.ApiClient
import com.example.androidapp.LoginApi


import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface LoginApi {
    @FormUrlEncoded
    @POST("login")
    fun login(@Field("email") email: String, @Field("password") password: String): Call<LoginResponse>
}
