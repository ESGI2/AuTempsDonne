package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var homeButton: ImageButton
    private lateinit var qrCodeButton: ImageButton
    private lateinit var nfcButton: ImageButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)

        homeButton.setOnClickListener { /* Rester sur la page d'accueil */ }

        qrCodeButton.setOnClickListener {
            val intent = Intent(this, QRCodeActivity::class.java)
            startActivity(intent)
        }

        nfcButton.setOnClickListener {
            val intent = Intent(this, NFCActivity::class.java)
            startActivity(intent)
        }
    }
}