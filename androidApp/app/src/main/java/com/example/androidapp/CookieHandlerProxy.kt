package com.example.androidapp

import android.annotation.TargetApi
import android.os.Build
import java.io.IOException
import java.net.CookieHandler
import java.net.HttpCookie
import java.net.HttpURLConnection
import java.net.URI

@TargetApi(Build.VERSION_CODES.N)
class CookieHandlerProxy : CookieHandler() {
    private val cookieManager: java.net.CookieManager = java.net.CookieManager()

    @Throws(IOException::class)
    override fun get(uri: URI, requestHeaders: Map<String, MutableList<String>>): Map<String, MutableList<String>> {
        val cookies = cookieManager.getCookieStore().get(uri)
        val newReqHeaders = HashMap(requestHeaders)
        newReqHeaders["Cookie"] = cookies?.map { it.toString() }?.toMutableList() ?: mutableListOf()
        return newReqHeaders
    }

    @Throws(IOException::class)
    override fun put(uri: URI, responseHeaders: Map<String, MutableList<String>>) {
        val cookies = responseHeaders["Set-Cookie"]
        if (cookies != null) {
            for (cookie in cookies) {
                cookieManager.getCookieStore().add(uri, HttpCookie.parse(cookie).first())
            }
        }
    }
}