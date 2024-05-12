package com.example.androidapp

import android.R
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView


class ActivitiesAdapter(context: Context?, activities: List<Activity?>?) :
    ArrayAdapter<Activity?>(context!!, 0, activities!!) {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var convertView = convertView
        val activity = getItem(position)
        if (convertView == null) {
            convertView =
                LayoutInflater.from(context).inflate(R.layout.activity_list_item, parent, false)
        }
        val tvName = convertView!!.findViewById<TextView>(R.id.tvName)
        val tvDescription = convertView.findViewById<TextView>(R.id.tvDescription)

        tvName.text = activity!!.activityName
        tvDescription.text = activity.description

        return convertView
    }
}
