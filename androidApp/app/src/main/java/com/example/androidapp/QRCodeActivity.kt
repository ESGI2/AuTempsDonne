package com.example.androidapp

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.zxing.ResultPoint
import com.journeyapps.barcodescanner.BarcodeCallback
import com.journeyapps.barcodescanner.BarcodeResult
import com.journeyapps.barcodescanner.CaptureManager
import com.journeyapps.barcodescanner.DecoratedBarcodeView

class QRCodeActivity : AppCompatActivity() {
    private lateinit var barcodeView: DecoratedBarcodeView
    private lateinit var captureManager: CaptureManager
    private lateinit var homeButton: ImageView
    private lateinit var qrCodeButton: ImageView
    private lateinit var nfcButton: ImageView
    private val requestCodeCameraPermission = 1001

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_qr_code)

        barcodeView = findViewById(R.id.cameraPreview)
        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), requestCodeCameraPermission)
        } else {
            initializeQRCodeReader(savedInstanceState)
        }

        homeButton.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        qrCodeButton.setOnClickListener {}

        nfcButton.setOnClickListener {
            val intent = Intent(this, NFCActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == requestCodeCameraPermission && grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            initializeQRCodeReader(null)
        } else {
            Toast.makeText(this, "Autorisation d'accès à la caméra requise", Toast.LENGTH_SHORT).show()
        }
    }

    private fun initializeQRCodeReader(savedInstanceState: Bundle?) {
        captureManager = CaptureManager(this, barcodeView)
        captureManager.initializeFromIntent(intent, savedInstanceState)
        captureManager.decode()
        barcodeView.decodeContinuous(callback)
    }

    private val callback: BarcodeCallback = object : BarcodeCallback {
        override fun barcodeResult(result: BarcodeResult) {
            val qrCodeValue = result.text
            Toast.makeText(this@QRCodeActivity, "Code QR détecté : $qrCodeValue", Toast.LENGTH_SHORT).show()
        }

        override fun possibleResultPoints(resultPoints: List<ResultPoint>) {}
    }
}