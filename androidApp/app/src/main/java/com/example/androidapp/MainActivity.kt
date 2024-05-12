package com.example.androidapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray

class MainActivity : AppCompatActivity() {

    private lateinit var homeButton: ImageView
    private lateinit var qrCodeButton: ImageView
    private lateinit var nfcButton: ImageView
    private lateinit var logoutButton: ImageView
    private lateinit var recyclerView: RecyclerView
    private lateinit var dataUpdateReceiver: BroadcastReceiver

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        homeButton = findViewById(R.id.homeButton)
        qrCodeButton = findViewById(R.id.qrCodeButton)
        nfcButton = findViewById(R.id.nfcButton)
        logoutButton = findViewById(R.id.logoutButton)
        recyclerView = findViewById(R.id.recyclerView)

        homeButton.setOnClickListener {
            // Your Home Button code here
        }

        qrCodeButton.setOnClickListener {
            startActivity(Intent(this, ScanActivity::class.java))
        }

        nfcButton.setOnClickListener {
            startActivity(Intent(this, NFCActivity::class.java))
        }

        logoutButton.setOnClickListener {
            finish()
        }

        fetchActivities()

        dataUpdateReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                if ("com.example.androidapp.ACTION_DATA_UPDATED" == intent.action) {
                    fetchActivities() // Refresh the data in the RecyclerView
                }
            }
        }

        val filter = IntentFilter("com.example.androidapp.ACTION_DATA_UPDATED")
        registerReceiver(dataUpdateReceiver, filter)
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(dataUpdateReceiver)
    }

    private fun fetchActivities() {
        val url = "http://213.199.38.64:3000/activity"
        val requestQueue = Volley.newRequestQueue(this)

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.GET, url, null,
            { response ->
                val activityList = parseActivities(response)
                setupRecyclerView(activityList)
            },
            { error ->
                error.printStackTrace()
            }
        )

        requestQueue.add(jsonArrayRequest)
    }

    private fun parseActivities(jsonArray: JSONArray): List<Activity> {
        val activityList = mutableListOf<Activity>()
        for (i in 0 until jsonArray.length()) {
            val jsonObject = jsonArray.getJSONObject(i)
            val date = jsonObject.getString("date")
            val description = jsonObject.getString("description")
            val peopleNeeded = jsonObject.getInt("peopleNeeded")
            val color = jsonObject.getString("color")
            activityList.add(Activity(date, description, peopleNeeded, color))
        }
        return activityList
    }

    private fun setupRecyclerView(activityList: List<Activity>) {
        val adapter = ActivityAdapter(activityList)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)
    }
}
