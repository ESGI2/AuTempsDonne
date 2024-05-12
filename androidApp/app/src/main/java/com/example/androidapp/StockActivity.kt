package com.example.androidapp

import androidx.appcompat.app.AppCompatActivity

class StockActivity : AppCompatActivity() {

    private lateinit var editTextQuantity: EditText
    private lateinit var editTextWarehouse: EditText
    private lateinit var editTextDate: EditText
    private lateinit var editTextDLC: EditText
    private lateinit var saveButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_stock)

        editTextQuantity = findViewById(R.id.editTextQuantity)
        editTextWarehouse = findViewById(R.id.editTextWarehouse)
        editTextDate = findViewById(R.id.editTextDate)
        editTextDLC = findViewById(R.id.editTextDLC)
        saveButton = findViewById(R.id.buttonSave)

        val ean = intent.getStringExtra("ean")
        val name = intent.getStringExtra("name")
        val category = intent.getStringExtra("category")

        saveButton.setOnClickListener {
            // Logique pour sauvegarder les informations en base de données ou autre stockage
            Toast.makeText(this, "Stock added for $name", Toast.LENGTH_LONG).show()
        }
    }
}
