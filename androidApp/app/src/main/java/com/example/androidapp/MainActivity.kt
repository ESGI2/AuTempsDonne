package com.example.androidapp


import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

class MainActivity : AppCompatActivity() {

    private var mRequestQueue: RequestQueue? = null
    private var mStringRequest: StringRequest? = null
    private val url = "https://localhost:3000/login"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        getData()
    }

    private fun getData() {
        mRequestQueue = Volley.newRequestQueue(this)


        mStringRequest = StringRequest(Request.Method.GET, url,
            Response.Listener { response ->
                Toast.makeText(applicationContext, "Response :$response", Toast.LENGTH_LONG).show()
            },
            Response.ErrorListener { error ->
                Log.i("TAG", "Error :" + error.toString())
            })

        mRequestQueue?.add(mStringRequest)
    }
}
