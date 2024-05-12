package com.example.androidapp

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.zxing.integration.android.IntentIntegrator
import com.google.zxing.integration.android.IntentResult

class ScanActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_scan)

        // Initialize barcode scanner
        IntentIntegrator(this).apply {
            setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES)
            setPrompt("Scan a barcode or QR Code")
            setCameraId(0)  // Use a specific camera of the device
            setBeepEnabled(false)
            setBarcodeImageEnabled(true)
            initiateScan()
        }
    }

    // Get the results:
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        if (result != null) {
            if (result.contents == null) {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show()
            } else {
                // Show the scanned result
                Toast.makeText(this, "Scanned: ${result.contents}", Toast.LENGTH_LONG).show()
                // Use the scanned content to lookup product details
                lookupProduct(result.contents)
            }
        }
    }

    private fun lookupProduct(ean: String) {
        val api = EANSearchAPI(this, "YOUR_API_TOKEN")
        api.lookupBarcode(ean) { response, error ->
            if (error != null) {
                Toast.makeText(this, "Error retrieving product info", Toast.LENGTH_SHORT).show()
            } else {
                // Process the response
                Toast.makeText(this, "Product info: $response", Toast.LENGTH_LONG).show()
                // Further processing like updating UI or database entries
            }
        }
    }
}
