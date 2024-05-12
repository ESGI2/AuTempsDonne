package com.example.androidapp

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson

class ProductFormActivity : AppCompatActivity() {

    private lateinit var editTextEAN: EditText
    private lateinit var editTextName: EditText
    private lateinit var editTextCategory: EditText
    private lateinit var editTextQuantity: EditText
    private lateinit var editTextReceptionDate: EditText
    private lateinit var editTextDLC: EditText
    private lateinit var editTextWarehouse: EditText
    private lateinit var sendButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_form)

        editTextEAN = findViewById(R.id.editTextEAN)
        editTextName = findViewById(R.id.editTextName)
        editTextCategory = findViewById(R.id.editTextCategory)
        editTextQuantity = findViewById(R.id.editTextQuantity)
        editTextReceptionDate = findViewById(R.id.editTextReceptionDate)
        editTextDLC = findViewById(R.id.editTextDLC)
        editTextWarehouse = findViewById(R.id.editTextWarehouse)
        sendButton = findViewById(R.id.buttonSend)

        intent.getStringExtra("product_json")?.let { json ->
            populateForm(json)
        }

        sendButton.setOnClickListener {
            sendProductData()
        }
    }

    private fun populateForm(productJson: String) {
        val product = Gson().fromJson(productJson, Product::class.java)
        editTextEAN.setText(product.ean)
        editTextName.setText(product.name)
        editTextCategory.setText(product.categoryName)
    }

    private fun sendProductData() {
        // Collect data from the form and send it to your server or database
    }
}
