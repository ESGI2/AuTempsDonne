package com.example.androidapp

import android.app.PendingIntent
import android.content.Intent
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.Ndef
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.nio.charset.Charset

class NFCActivity : AppCompatActivity() {

    private lateinit var nfcStatus: TextView
    private var nfcAdapter: NfcAdapter? = null
    private lateinit var pendingIntent: PendingIntent

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nfc)
        nfcStatus = findViewById(R.id.nfcStatus)
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        if (nfcAdapter == null) {
            Toast.makeText(this, "NFC non disponible sur cet appareil", Toast.LENGTH_SHORT).show()
            finish()
        } else {
            pendingIntent = PendingIntent.getActivity(
                this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
                PendingIntent.FLAG_IMMUTABLE
            )
        }
    }

    override fun onResume() {
        super.onResume()
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, null, null)
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleIntent(intent)
    }

    private fun handleIntent(intent: Intent) {
        if (NfcAdapter.ACTION_NDEF_DISCOVERED == intent.action) {
            val tag = intent.getParcelableExtra<Tag>(NfcAdapter.EXTRA_TAG)
            tag?.let {
                handleNdefDiscovered(it)
            }
        }
    }

    private fun handleNdefDiscovered(tag: Tag) {
        val ndef = Ndef.get(tag)
        try {
            ndef.connect()
            val ndefMessage = ndef.ndefMessage
            if (ndefMessage != null) {
                val builder = StringBuilder()
                for (record in ndefMessage.records) {
                    val payload = record.payload
                    val textEncoding = if ((payload[0].toInt() and 128) == 0) "UTF-8" else "UTF-16"
                    val languageCodeLength = payload[0].toInt() and 63
                    val text = String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, Charset.forName(textEncoding))
                    builder.append("Type: ${String(record.type, Charset.forName("US-ASCII"))}\n")
                    builder.append("Contenu: $text\n")
                }
                runOnUiThread { nfcStatus.text = builder.toString() }
            } else {
                runOnUiThread { nfcStatus.text = "Aucune donnée NDEF sur ce tag." }
            }
        } catch (e: Exception) {
            runOnUiThread {
                Toast.makeText(this, "Erreur lors de la lecture du tag: ${e.message}", Toast.LENGTH_LONG).show()
            }
        } finally {
            ndef?.close()
        }
    }
}
