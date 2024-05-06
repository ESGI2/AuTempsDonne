package com.example.androidapp

import android.content.Intent
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var homeButton: ImageView
    private lateinit var qrCodeButton: ImageView
    private lateinit var nfcButton: ImageView
    private lateinit var logoutButton: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)
        logoutButton = findViewById(R.id.logoutButton)

        homeButton.setOnClickListener {}

        qrCodeButton.setOnClickListener {
            val intent = Intent(this, QRCodeActivity::class.java)
            startActivity(intent)
        }

        nfcButton.setOnClickListener {
            val intent = Intent(this, NFCActivity::class.java)
            startActivity(intent)
        }

        logoutButton.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}