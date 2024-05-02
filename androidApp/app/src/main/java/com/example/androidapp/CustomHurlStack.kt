package com.example.androidapp

import com.android.volley.toolbox.HurlStack
import java.net.HttpURLConnection
import java.net.URI
import java.net.URL

class CustomHurlStack(private val cookieHandler: CookieHandlerProxy) : HurlStack() {
    override fun createConnection(url: URL): HttpURLConnection {
        val connection = super.createConnection(url)
        val uri = URI(url.toString())
        val cookieMap = cookieHandler.get(uri, emptyMap())
        val cookieList = cookieMap["Cookie"]
        if (cookieList != null && cookieList.isNotEmpty()) {
            connection.setRequestProperty("Cookie", cookieList.joinToString(";"))
        }
        return connection
    }
}
