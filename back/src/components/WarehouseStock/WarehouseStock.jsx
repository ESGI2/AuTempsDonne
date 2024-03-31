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

function deleteProductByName(name) {
    return ky.delete(`http://localhost:3000/product/${name}`, {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

const Modal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <p>Ajouter un produit</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Fermer</button>
            </div>
        </div>
    );
};

const WarehouseStock = () => {
    const [products, setProducts] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const dataRows = products.map(product => {
        const stock = stocks.find(stock => stock.id_product === product.id);
        const warehouse = stock ? warehouses.find(warehouse => warehouse.id === stock.id_warehouse) : null;

        return {
            id: product.id,
            name: product.name,
            type: product.type,
            donation: product.donation,
            quantity: stock ? stock.quantity : 0,
            warehouseName: warehouse ? warehouse.name : "Unknown"
        };
    });

    return (
        <div>
            <div>
                <button onClick={openModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Nouveau produit</button>
                {showModal && <Modal onClose={closeModal} />}
            </div>
            <div className="max-w-md mt-5 mx-auto">
                <table className="w-full">
                    <thead>
                    <tr style={{ backgroundColor: '#CECFCF' , borderRadius : "5px" }} >
                        <th className="py-2.5 px-3 text-left" >ID</th>
                        <th className="py-2.5 px-3 text-left">Type</th>
                        <th className="py-2.5 px-3 text-left">Product</th>
                        <th className="py-2.5 px-3 text-left">Nombre total (kg)</th>
                        <th className="py-2.5 px-3 text-left">Donation</th>
                        <th className="py-2.5 px-3 text-left">Entrepôt</th>
                        <th className="py-2.5 px-3 text-left"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataRows.map(row => (
                        <tr key={row.id}>
                            <td className="py-2.5 px-3">{row.id}</td>
                            <td className="py-2.5 px-3">{row.type}</td>
                            <td className="py-2.5 px-3">{row.name}</td>
                            <td className="py-2.5 px-3">{row.quantity}</td>
                            <td className="py-2.5 px-3">{row.donation ? "oui" : "non "}</td>
                            <td className="py-2.5 px-3">{row.warehouseName}</td>
                            <td className="py-2.5 px-3"><button /*onClick={deleteProductByName(row.name)} */>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseStock;
