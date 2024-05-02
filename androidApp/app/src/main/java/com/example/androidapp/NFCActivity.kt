package com.example.androidapp

import android.app.PendingIntent
import android.content.Intent
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.Ndef
import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.io.UnsupportedEncodingException
import java.nio.charset.Charset

class NFCActivity : AppCompatActivity() {

    private lateinit var nfcStatus: TextView
    private lateinit var homeButton: ImageButton
    private lateinit var qrCodeButton: ImageButton
    private lateinit var nfcButton: ImageButton
    private lateinit var nfcAdapter: NfcAdapter
    private lateinit var pendingIntent: PendingIntent

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nfc)

        nfcStatus = findViewById(R.id.nfcStatus)
        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)

        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        pendingIntent = PendingIntent.getActivity(this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0)

        homeButton.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        qrCodeButton.setOnClickListener {
            val intent = Intent(this, QRCodeActivity::class.java)
            startActivity(intent)
        }

        nfcButton.setOnClickListener { /* Rester sur la page du lecteur NFC */ }
    }

    override fun onResume() {
        super.onResume()
        if (nfcAdapter != null) {
            nfcAdapter.enableForegroundDispatch(this, pendingIntent, null, null)
        }
    }

    override fun onPause() {
        super.onPause()
        if (nfcAdapter != null) {
            nfcAdapter.disableForegroundDispatch(this)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        if (NfcAdapter.ACTION_TECH_DISCOVERED == intent.action || NfcAdapter.ACTION_TAG_DISCOVERED == intent.action) {
            val tag = intent.getParcelableExtra<Tag>(NfcAdapter.EXTRA_TAG)
            readNfcTag(tag)
        }
    }

    private fun readNfcTag(tag: Tag?) {
        val ndef = Ndef.get(tag)
        if (ndef != null) {
            ndef.connect()
            val ndefMessage = ndef.ndefMessage
            if (ndefMessage != null) {
                val records = ndefMessage.records
                for (record in records) {
                    val payload = record.payload
                    val textEncoding = if (payload[0].toInt() == 0x02) "UTF-16" else "UTF-8"
                    val languageCodeLength = payload[0].toInt()
                    try {
                        val textData = String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, Charset.forName(textEncoding))
                        nfcStatus.text = "Données NFC : $textData"
                    } catch (e: UnsupportedEncodingException) {
                        e.printStackTrace()
                        Toast.makeText(this@NFCActivity, "Erreur lors de la lecture des données NFC", Toast.LENGTH_SHORT).show()
                    }
                }
            } else {
                nfcStatus.text = "Aucune donnée NDEF sur ce tag"
            }
            ndef.close()
        } else {
            Toast.makeText(this@NFCActivity, "Impossible de lire ce tag NFC", Toast.LENGTH_SHORT).show()
        }
    }
}