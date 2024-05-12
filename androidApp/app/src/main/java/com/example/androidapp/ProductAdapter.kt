package com.example.androidapp

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView

class ProductAdapter(private val productList: List<Product>) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(val view: ConstraintLayout) : RecyclerView.ViewHolder(view) {
        var productName: TextView = view.findViewById(R.id.tvProductName)
        var productEAN: TextView = view.findViewById(R.id.tvProductEAN)
        var productCategory: TextView = view.findViewById(R.id.tvProductCategory)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val layout = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_product, parent, false) as ConstraintLayout
        return ProductViewHolder(layout)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.productName.text = product.name
        holder.productEAN.text = product.ean
        holder.productCategory.text = product.categoryName
    }

    override fun getItemCount() = productList.size
}
