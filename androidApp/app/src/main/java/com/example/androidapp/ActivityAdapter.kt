package com.example.androidapp


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView


data class Activity(
    val date: String,
    val description: String,
    val peopleNeeded: Int,
    val color: String
)

class ActivityAdapter(private val activityList: List<Activity>) :
    RecyclerView.Adapter<ActivityAdapter.ActivityViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ActivityViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(android.R.layout.simple_list_item_2, parent, false)
        return ActivityViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ActivityViewHolder, position: Int) {
        val activity = activityList[position]
        holder.dateView.text = activity.date
        holder.descriptionView.text = activity.description
    }

    override fun getItemCount(): Int = activityList.size

    class ActivityViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var dateView: TextView = view.findViewById(android.R.id.text1)
        var descriptionView: TextView = view.findViewById(android.R.id.text2)
    }
}
