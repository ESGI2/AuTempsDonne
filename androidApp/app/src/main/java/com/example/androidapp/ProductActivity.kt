package com.example.androidapp

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.AuthFailureError
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONException
import org.json.JSONObject

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

        saveButton.setOnClickListener(View.OnClickListener { v: View? ->
            try {
                saveProduct()
            } catch (e: JSONException) {
                Toast.makeText(
                    this,
                    "Error creating JSON object.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
    }

    @Throws(JSONException::class)
    private fun saveProduct() {
        val name = editTextName.text.toString()
        val category = editTextCategory.text.toString()
        val ean = editTextEAN.text.toString()

        val jsonBody = JSONObject()
        jsonBody.put("name", name)
        jsonBody.put("category", category)
        jsonBody.put("ean", ean)

        val url = "http://213.199.38.64:3000/product"

        val stringRequest: StringRequest = object : StringRequest(
            Method.POST, url,
            Response.Listener {
                Toast.makeText(
                    this@ProductActivity,
                    "Product saved successfully!",
                    Toast.LENGTH_LONG
                ).show()
            },
            Response.ErrorListener { error ->
                Toast.makeText(
                    this@ProductActivity,
                    "Failed to save product: " + error.message,
                    Toast.LENGTH_LONG
                ).show()
            }) {
            override fun getParams(): Map<String, String>? {
                val params: MutableMap<String, String> = HashMap()
                params["name"] = name
                params["category"] = category
                params["ean"] = ean
                params["donation"] = "false"
                return params
            }

            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            @Throws(AuthFailureError::class)
            override fun getBody(): ByteArray {
                return jsonBody.toString().toByteArray()
            }
        }

        queue.add(stringRequest)
    }
}