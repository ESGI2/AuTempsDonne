package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.zxing.integration.android.IntentIntegrator
import org.json.JSONException
import org.json.JSONObject

class ScanActivity : AppCompatActivity() {
    private lateinit var homeButton: ImageView
    private lateinit var qrCodeButton: ImageView
    private lateinit var nfcButton: ImageView
    private lateinit var editTextEAN: EditText
    private lateinit var searchEANButton: Button
    private lateinit var scanButton: Button
    private lateinit var addProduit : Button
    private lateinit var afficheProduit : Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_scan)

        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)
        editTextEAN = findViewById(R.id.editTextEAN)
        searchEANButton = findViewById(R.id.buttonSearchEAN)
        scanButton = findViewById(R.id.buttonScanQR)
        addProduit = findViewById(R.id.buttonAddProduit)
        afficheProduit = findViewById(R.id.afficherListeProduits)


        homeButton.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        qrCodeButton.setOnClickListener {}

        nfcButton.setOnClickListener {
            startActivity(Intent(this, NFCActivity::class.java))
        }

        searchEANButton.setOnClickListener {
            val ean = editTextEAN.text.toString().trim()
            if (ean.isNotEmpty()) {
                searchProductUsingEAN(ean)
            } else {
                Toast.makeText(this, "Please enter a valid EAN", Toast.LENGTH_SHORT).show()
            }
        }

        scanButton.setOnClickListener {
            setupBarcodeScanner()
        }

        addProduit.setOnClickListener {
            startActivity(Intent(this, ProductActivity::class.java))
        }
        afficheProduit.setOnClickListener {
            startActivity(Intent(this, ProductAdapter::class.java))
        }
    }

    private fun setupBarcodeScanner() {
        IntentIntegrator(this).apply {
            setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES)
            setPrompt("Scan a barcode or QR Code")
            setCameraId(0)
            setBeepEnabled(false)
            setBarcodeImageEnabled(true)
            initiateScan()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        if (result != null) {
            if (result.contents == null) {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show()
            } else {
                editTextEAN.setText(result.contents)
                searchProductUsingEAN(result.contents)
            }
        }
    }

    private fun searchProductUsingEAN(ean: String) {
        val url = "https://api.ean-search.org/api?token=b071df397ede2b74cd521767a01c559d2abb3f17&op=barcode-lookup&ean=$ean&format=json"
        val queue = Volley.newRequestQueue(this)

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                handleProductSearchResponse(response, ean)
            },
            {
                Toast.makeText(this, "Failed to retrieve product details from EAN Search", Toast.LENGTH_LONG).show()
            }
        )

        queue.add(stringRequest)
    }

    private fun handleProductSearchResponse(response: String, ean: String) {
        try {
            val jsonObject = JSONObject(response)
            val products = jsonObject.getJSONArray("product")
            if (products.length() > 0) {
                val product = products.getJSONObject(0)
                checkProductInSystem(product, ean)
            } else {
                Toast.makeText(this, "No product found with this EAN", Toast.LENGTH_LONG).show()
            }
        } catch (e: JSONException) {
            Toast.makeText(this, "Failed to parse product details: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    private fun checkProductInSystem(product: JSONObject, ean: String) {
        val productName = product.optString("name", "No name provided")
        val productCategory = product.optString("category", "No category provided")

        val url = "http://213.199.38.64:3000/product/$ean"
        val queue = Volley.newRequestQueue(this)

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                val intent = Intent(this, StockActivity::class.java)
                intent.putExtra("ean", ean)
                intent.putExtra("name", productName)
                intent.putExtra("category", productCategory)
                startActivity(intent)
            },
            {
                val intent = Intent(this, ProductActivity::class.java)
                intent.putExtra("ean", ean)
                intent.putExtra("name", productName)
                intent.putExtra("category", productCategory)
                startActivity(intent)
            }
        )

        queue.add(stringRequest)
    }
}
