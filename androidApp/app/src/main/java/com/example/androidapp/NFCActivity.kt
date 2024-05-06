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
        } else {
            pendingIntent = PendingIntent.getActivity(this, 0, Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), PendingIntent.FLAG_IMMUTABLE)
        }
    }

    override fun onResume() {
        super.onResume()
        if (nfcAdapter != null) {
            nfcAdapter!!.enableForegroundDispatch(this, pendingIntent, null, null)
        }
    }

    override fun onPause() {
        super.onPause()
        if (nfcAdapter != null) {
            nfcAdapter!!.disableForegroundDispatch(this)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        if (NfcAdapter.ACTION_TECH_DISCOVERED == intent.action || NfcAdapter.ACTION_TAG_DISCOVERED == intent.action) {
            val tag = intent.getParcelableExtra<Tag>(NfcAdapter.EXTRA_TAG)
            if (tag != null) {
                readNfcTag(tag)
            } else {
                Toast.makeText(this, "Impossible de récupérer le tag NFC", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun readNfcTag(tag: Tag) {
        val ndef = Ndef.get(tag)
        if (ndef != null) {
            ndef.connect()
            val ndefMessage = ndef.ndefMessage
            if (ndefMessage != null) {
                val records = ndefMessage.records
                val textData = records.firstOrNull()?.payload?.let { payload ->
                    val textEncoding = if (payload[0].toInt() == 0x02) "UTF-16" else "UTF-8"
                    val languageCodeLength = payload[0].toInt()
                    String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, Charset.forName(textEncoding))
                }
                nfcStatus.text = textData ?: "Aucune donnée NFC"
            } else {
                nfcStatus.text = "Aucune donnée NDEF sur ce tag"
            }
            ndef.close()
        } else {
            Toast.makeText(this, "Impossible de lire ce tag NFC", Toast.LENGTH_SHORT).show()
        }
    }
}