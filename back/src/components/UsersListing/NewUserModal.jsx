import React, { useEffect, useState } from 'react';
import ky from 'ky';
import CancelButton from "../Button/CancelButton.jsx";
import ValidateButton from "../Button/ValidateButton.jsx";
import {Alert} from "react-bootstrap";

const NewUserModal = ({ onClose }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: role
        }

        if (!first_name || !last_name || !email || !password || !role) {
            setError('Please fill in all fields');
            return;
        }

        if (role === 'beneficiary') {
            createBeneficiary(user).then(() => {
                onClose();
            });
        } else {
            createVolunteer(user).then(() => {
                onClose();
            });
        }
    }

    const createBeneficiary = async (user) => {
        const response = await ky.post('http://autempsdonne.site:3000/register/beneficiary', { json: user });
        return response.json();
    }

    const createVolunteer = async (user) => {
        const response = await ky.post('http://autempsdonne.site:3000/register/volunteer', { json: user });
        return response.json();
    }



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Nouvel utilisateur</h2>
                {error && <Alert type="error">{error}</Alert> }
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" id="first_name" name="first_name"onChange={handleFirstNameChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" id="last_name" name="last_name" onChange={handleLastNameChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" onChange={handleEmailChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" onChange={handlePasswordChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                        <select id="role" name="role"onChange={handleRoleChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1">
                            <option value="">Select a role</option>
                            <option value="beneficiary">Beneficiary</option>
                            <option value="volunteer">Volunteer</option>
                        </select>
                    </div>
                <div className="flex justify-end">
                    <CancelButton onClick={onClose}>Cancel</CancelButton>.
                    <ValidateButton type="submit">Create</ValidateButton>
                </div>
                </form>
            </div>
        </div>
    );
};

export default NewUserModal;
