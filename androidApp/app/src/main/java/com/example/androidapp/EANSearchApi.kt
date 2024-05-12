package com.example.androidapp

import android.content.Context
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

class EANSearchAPI(private val context: Context, private val apiToken: String = "b071df397ede2b74cd521767a01c559d2abb3f17") {
    private val baseUrl = "https://api.ean-search.org/api"
    private val requestQueue = Volley.newRequestQueue(context)

    fun lookupBarcode(ean: String, callback: (Product?, Exception?) -> Unit) {
        val url = "$baseUrl?token=$apiToken&op=barcode-lookup&format=json&ean=$ean"
        makeRequest(url, Product::class.java, callback)
    }

    fun searchProduct(name: String, callback: (SearchResults?, Exception?) -> Unit) {
        val encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8.toString())
        val url = "$baseUrl?token=$apiToken&op=product-search&format=json&name=$encodedName"
        makeRequest(url, SearchResults::class.java, callback)
    }

    fun searchByPrefix(prefix: String, callback: (SearchResults?, Exception?) -> Unit) {
        val url = "$baseUrl?token=$apiToken&op=barcode-prefix-search&format=json&prefix=$prefix"
        makeRequest(url, SearchResults::class.java, callback)
    }



    private fun <T> makeRequest(url: String, clazz: Class<T>, callback: (T?, Exception?) -> Unit) {
        val request = StringRequest(
            Request.Method.GET, url,
            { response ->
                try {
                    val gson = Gson()
                    val result = gson.fromJson(response, clazz)
                    callback(result, null)
                } catch (e: Exception) {
                    callback(null, e)
                }
            },
            { error -> callback(null, Exception(error)) }
        )
        requestQueue.add(request)
    }
}

data class SearchResults(
    val page: Int,
    val moreproducts: Boolean,
    val totalproducts: Int,
    val productlist: List<Product>
)

data class Product(
    val ean: String,
    val name: String,
    val categoryId: String,
    val categoryName: String,
    val issuingCountry: String
)