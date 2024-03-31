import { useEffect, useState } from 'react';
import ky from "ky";

function getAllProducts() {
    return ky.get("http://localhost:3000/product", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

function getAllStocks() {
    return ky.get("http://localhost:3000/stock/all", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

function getAllWarehouses() {
    return ky.get("http://localhost:3000/warehouse", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

const WarehouseStock = () => {
    const [products, setProducts] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
        });

        getAllStocks().then((data) =>{
            setStocks(data)
        });

        getAllWarehouses().then((data) =>{
            setWarehouses(data)
        });
    }, []);


    const dataRows = products.map(product => {
        const stock = stocks.find(stock => stock.id_product === product.id);
        const warehouse = stock ? warehouses.find(warehouse => warehouse.id === stock.id_warehouse) : null;

        return {
            id: product.id,
            name: product.name,
            quantity: stock ? stock.quantity : 0,
            warehouseName: warehouse ? warehouse.name : "Unknown"
        };
    });


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Warehouse</th>
                </tr>
                </thead>
                <tbody>
                {dataRows.map(row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.quantity}</td>
                        <td>{row.warehouseName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseStock;
