package com.example.androidapp

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject
import com.android.volley.RequestQueue

class ProductActivity : AppCompatActivity() {
    private lateinit var editTextName: EditText
    private lateinit var editTextCategory: EditText
    private lateinit var editTextEAN: EditText
    private lateinit var saveButton: Button
    private lateinit var queue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product)

        editTextName = findViewById(R.id.etProductName)
        editTextCategory = findViewById(R.id.etProductDetails)
        editTextEAN = findViewById(R.id.etProductEAN)
        saveButton = findViewById(R.id.btnSaveProduct)

        queue = Volley.newRequestQueue(this)

        saveButton.setOnClickListener {
            try {
                saveProduct()
            } catch (e: Exception) {
                Toast.makeText(this, "Error creating JSON object: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun saveProduct() {
        val name = editTextName.text.toString()
        val category = editTextCategory.text.toString()
        val ean = editTextEAN.text.toString()

        val jsonBody = JSONObject()
        jsonBody.put("name", name)
        jsonBody.put("category", category)
        jsonBody.put("ean", ean)
        jsonBody.put("donation", false)

        val url = "http://213.199.38.64:3000/product"

        val stringRequest = object : StringRequest(
            Method.POST, url,
            Response.Listener<String> {
                Toast.makeText(this, "Product saved successfully!", Toast.LENGTH_LONG).show()
            },
            Response.ErrorListener { error ->
                Toast.makeText(this, "Failed to save product: ${error.message}", Toast.LENGTH_LONG).show()
            }) {
            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            override fun getBody(): ByteArray {
                return jsonBody.toString().toByteArray(charset("utf-8"))
            }
        }

        queue.add(stringRequest)
    }
}
