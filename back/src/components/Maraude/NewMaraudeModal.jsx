import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import CancelButton from "../Button/CancelButton.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";
import ky from 'ky';

const NewMaraudeModal = ({ closeModal }) => {
    const [error, setError] = useState(null);
    const [show, setShow] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        road_start: null,
        road_end: null,
    });
    const [inter, setInter] = useState([]);
    const [points, setPoints] = useState([]);
    const [products, setProducts] = useState([]);
    // Tableau associatif de produit avec la quantité
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleClose = () => {
        setShow(false);
        closeModal(step);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            await ky.post('http://localhost:3000/maraude', {
                json: {
                    title: formData.name,
                    description: formData.description,
                    date_start: formData.date_start,
                    date_end: formData.date_end,
                    road_start: formData.road_start,
                    road_end: formData.road_end,
                    road_inter: inter.join(','),
                    product: selectedProducts.map(p => `${p.productObject.id}:${p.quantity}`).join(','),
                    truck: 1
                },
                credentials: 'include'
            }).json();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleNextStep = () => {
        if (step === 1) {
            if (validateForm()) {
                setError(null)
                setStep(2);
            }
        }
        if (step === 2) {
            if (validateForm()) {
                setError(null)
                setStep(3);
            }
        }
        if (step === 3) {
            if (validateForm()) {
                handleSubmit();
                handleClose();
            }
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = document.getElementById('productOption').value;
        const productObject = products.find(p => p.id === parseInt(product));

        // Vérifier si le produit est déjà dans la liste
        if (selectedProducts.find(p => p.productObject.id === productObject.id)) {
            setError('Le produit est déjà dans la liste');
            return;
        }

        const quantity = document.getElementById('productQuantity').value;

        // Vérifier si la quantité est de 0 ou vide
        if (quantity <= '0' || quantity === '') {
            setError('La quantité ne peut pas être de 0, moins, ou vide');
            return;
        }

        setError(null);
        setSelectedProducts([...selectedProducts, { productObject, quantity }]);

        // Reset les champs
        document.getElementById('productOption').value = '';
        document.getElementById('productQuantity').value = '';
    }

    const validateForm = () => {
        const { name, description, date_start, date_end, road_start, road_end } = formData;
        if (step === 1 && (name === '' || description === '' || date_start === '' || date_end === '')) {
            setError('Veuillez remplir tous les champs');
            return false;
        } else if (step === 2 && (road_start === null || road_end === null)) {
            setError('Veuillez sélectionner un point de départ, un point d\'arrivée');
            return false;
        }
        return true;
    }

    const fetchPoints = async () => {
        try {
            const data = await ky.get('http://localhost:3000/maraudePoint', {
                credentials: 'include'
            }).json();
            setPoints(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const fetchProducts = async () => {
        try {
            const data = await ky.get('http://localhost:3000/product', {
                credentials: 'include'
            }).json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchPoints();
        fetchProducts();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle maraude - Étape {step}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {step === 1 && (
                            <>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Entrez le nom"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Entrez la description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formStartDate">
                                    <Form.Label>Date de début</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="date_start"
                                        value={formData.date_start}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEndDate">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="date_end"
                                        value={formData.date_end}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Form.Group controlId="formStart">
                                    <Form.Label>Point de départ</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="road_start"
                                        value={formData.road_start}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un point de départ</option>
                                        {points.map(point => (
                                            <option key={point.id} value={point.id}>{point.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formEnd">
                                    <Form.Label>Point arrivée</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="road_end"
                                        value={formData.road_end}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un point arrivée</option>
                                        {points.map(point => (
                                            <option key={point.id} value={point.id}>{point.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formInter">
                                    <Form.Label>Points intermédiaires</Form.Label>
                                {/*    Liste de checkbox avec chaque points (affichage : nom du point)*/}
                                {/*    Quand un point est coché, rajoute le point dans le state inter*/}
                                {/*    Quand un point est déchocher, le retire*/}

                                    {points.map(point => (
                                        <Form.Check
                                            key={point.id}
                                            type="checkbox"
                                            label={point.name}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInter([...inter, point.id]);
                                                } else {
                                                    setInter(inter.filter(id => id !== point.id));
                                                }
                                            }}
                                        />
                                    ))}
                                </Form.Group>
                            </>
                        )}
                        {/* Ici nous allons nous occuper de la gestion des denrées pour la maraude */}
                        {/* On liste les produit dans un select option avec à coté un input number*/}
                        {/*Enfin, un bouton ajouter qui va ajouter le produit a la liste des produit selectionner*/}
                        {step === 3 && (
                            <>
                                <Form.Group controlId="formProducts">
                                    <Form.Label>Produits</Form.Label>
                                    <div className="d-flex">
                                        <select id="productOption">
                                            <option value="">Sélectionnez un produit</option>
                                            {products.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                        <input type="number" id="productQuantity" placeholder="Quantité" />
                                        <ClassicButton onClick={handleAddProduct}>Ajouter</ClassicButton>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formSelectedProducts">
                                    {(selectedProducts.length !== 0) && <Form.Label>Produits sélectionnés</Form.Label>}
                                    <ul>
                                        {selectedProducts.map((product, index) => (
                                            <div key={index} className="d-flex">
                                                <li key={index}>{product.productObject.name} - {product.quantity}</li>
                                                <p onClick={() => {
                                                    setSelectedProducts(selectedProducts.filter((_, i) => i !== index))
                                                }}
                                                className="border-3 border-danger text-center bg-danger text-white cursor-pointer pl-1 pr-1 rounded ml-2">X</p>
                                            </div>
                                        ))}
                                    </ul>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ClassicButton onClick={handleNextStep}>{step === 3 ? 'Créer' : 'Suivant'}</ClassicButton>
                    <CancelButton onClick={handleClose}>Annuler</CancelButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewMaraudeModal;
