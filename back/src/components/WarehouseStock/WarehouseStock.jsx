import React, { useEffect, useState } from 'react';
import ky from "ky";
import Modal from './Modal';

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

function patchProductquantity(id, warehouseId, quantity) {
    return ky.patch(`http://localhost:3000/stock/${id}/${warehouseId}/${quantity}`, {
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
    const [showModal, setShowModal] = useState(false);
    const [quantityToAdd, setQuantityToAdd] = useState(0);

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

    const handleChangeQuantity = (event) => {
        setQuantityToAdd(event.target.value);
    };

    const handleModifyQuantity = (id, warehouseId) => {
        patchProductquantity(id, warehouseId, quantityToAdd)
            .then(() => {
            })
            .catch((error) => {
                console.error('Une erreur s\'est produite :', error);
            });
    };

    const dataRows = products.map(product => {
        const stock = stocks.find(stock => stock.id_product === product.id);
        const warehouse = stock ? warehouses.find(warehouse => warehouse.id === stock.id_warehouse) : null;

        console.log(stock)

        return {
            id: product.id,
            name: product.name,
            type: product.type,
            donation: product.donation,
            quantity: stock ? stock.quantity : 0,
            warehouseName: warehouse ? warehouse.name : "Unknown",
            warehouseId: warehouse ? warehouse.id : null,
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
                    <tr style={{ backgroundColor: '#CECFCF', borderRadius: "5px" }} >
                        <th className="py-2.5 px-3 text-left" >ID</th>
                        <th className="py-2.5 px-3 text-left">Type</th>
                        <th className="py-2.5 px-3 text-left">Product</th>
                        <th className="py-2.5 px-3 text-left">Nombre total (kg)</th>
                        <th className="py-2.5 px-3 text-left">Donation</th>
                        <th className="py-2.5 px-3 text-left">Entrepôt</th>
                        <th className="py-2.5 px-3 text-left">Actions</th>
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
                            <td className="py-2.5 px-3">
                                <input className="border border-black rounded-md" type="number" value={quantityToAdd} onChange={handleChangeQuantity} />
                                <button onClick={() => handleModifyQuantity(row.id, row.warehouseId)}>Modifier</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseStock;
