import {useEffect, useState} from 'react';
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

const WarehouseStock = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllProducts().then((data) => {
            setItems(data);
        });
    }, []);

    console.log(items.map(items => items.id))

    return (
        <p>{items.map(items => items.id)}</p>
    );
};

export default WarehouseStock;
