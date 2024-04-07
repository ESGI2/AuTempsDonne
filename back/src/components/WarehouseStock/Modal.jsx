import React, { useEffect, useState } from 'react';
import ky from 'ky';

const Modal = ({ onClose }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productDonation, setProductDonation] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getAllWarehouses().then(data => {
            setWarehouses(data);
        });
    }, []);

    const getAllWarehouses = async () => {
        try {
            const response = await ky.get("http://localhost:3000/warehouse", {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch warehouses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching warehouses:', error);
            return [];
        }
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const handleProductDonationChange = (event) => {
        setProductDonation(event.target.checked);
    };

    const handleWarehouseChange = (event) => {
        setSelectedWarehouse(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const addedProduct = await AddProduct(productName, productType, productDonation);
            const addedStock = await AddStock(addedProduct.id, selectedWarehouse, quantity);
            console.log('Product and stock added successfully:', addedProduct, addedStock);
            onClose();
        } catch (error) {
            console.error('Error adding product and stock:', error);
        }
    };

    const AddProduct = async (name, type, donation) => {
        const queryString = `?name=${name}&type=${type}&donation=${donation}`;
        try {
            const response = await ky.post(`http://localhost:3000/product${queryString}`, {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };

    const AddStock = async (productId, warehouseId, quantity) => {
        const queryString = `?id_product=${productId}&id_warehouse=${warehouseId}&quantity=${quantity}`;
        try {
            const response = await ky.post(`http://localhost:3000/stock${queryString}`, {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Failed to add stock');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding stock:', error);
            throw error;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Ajouter un produit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nom du produit</label>
                        <input type="text" id="productName" name="productName" value={productName} onChange={handleProductNameChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productType" className="block text-sm font-medium text-gray-700">Type</label>
                        <select id="productType" name="productType" value={productType} onChange={handleProductTypeChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                            <option value="">Sélectionner le type</option>
                            <option value="Materials">Materials</option>
                            <option value="Food">Food</option>
                            <option value="Hygiene">Hygiene</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Donation</label>
                        <div className="flex items-center mt-1">
                            <input type="checkbox" id="donation" name="donation" checked={productDonation} onChange={handleProductDonationChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="donation" className="ml-2 block text-sm text-gray-900">Donation</label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">Entrepôt</label>
                        <select id="warehouse" name="warehouse" value={selectedWarehouse} onChange={handleWarehouseChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                            <option value="">Sélectionner l'entrepôt</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantité</label>
                        <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Ajouter</button>
                        <button type="button" onClick={onClose} className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
