package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray

class MainActivity : AppCompatActivity() {

    private lateinit var homeButton: ImageView
    private lateinit var qrCodeButton: ImageView
    private lateinit var nfcButton: ImageView
    private lateinit var logoutButton: ImageView
    private lateinit var recyclerView: RecyclerView
    private lateinit var authManager: AuthManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)
        logoutButton = findViewById(R.id.logoutButton)
        recyclerView = findViewById(R.id.recyclerView)

        homeButton.setOnClickListener {}

        qrCodeButton.setOnClickListener {
            val intent = Intent(this, ScanActivity::class.java)
            startActivity(intent)
        }

        nfcButton.setOnClickListener {
            val intent = Intent(this, NFCActivity::class.java)
            startActivity(intent)
        }

        logoutButton.setOnClickListener {
            authManager.logout()
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

        fetchProducts()
    }

    private fun fetchProducts() {
        val url = "http://213.199.38.64:3000/product/"
        val requestQueue = Volley.newRequestQueue(this)

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.GET, url, null,
            { response ->
                val productList = parseProducts(response)
                setupRecyclerView(productList)
            },
            { error ->
                error.printStackTrace()
            }
        )

        requestQueue.add(jsonArrayRequest)
    }

    private fun parseProducts(jsonArray: JSONArray): List<Product> {
        val productList = mutableListOf<Product>()
        for (i in 0 until jsonArray.length()) {
            val jsonObject = jsonArray.getJSONObject(i)
            val name = jsonObject.getString("name")
            val ean = jsonObject.getString("ean")
            val categoryName = jsonObject.getString("categoryName")
            productList.add(Product(name, ean, categoryName))
        }
        return productList
    }

    private fun setupRecyclerView(productList: List<Product>) {
        val adapter = ProductAdapter(productList)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)
    }
}
