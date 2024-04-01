import { useState } from 'react';
import ky from 'ky';

const EditUserModal = ({ user, onClose }) => {
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [account_status, setStatus] = useState(user.account_status);
    const [phone, setPhoneNumber] = useState(user.phone || '');
    const [nbr_child, setChildrens] = useState(user.nbr_child || '');
    const [newsletter, setNewsletter] = useState(user.newsletter);
    const [country, setCountry] = useState(user.country || '');
    const [city, setCity] = useState(user.city || '');
    const [postal_code, setPostalCode] = useState(user.postal_code || '');
    const [road, setRoad] = useState(user.road || '');
    const [date_of_birth, setBirthDate] = useState(user.date_of_birth || '');
    const [nationality, setNationality] = useState(user.nationality || '');
    const [family_situation, setFamilySituation] = useState(user.family_situation || '');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleChildrensChange = (event) => {
        setChildrens(event.target.value);
    }

    const handleNewsletterChange = (event) => {
        setNewsletter(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    }

    const handleRoadChange = (event) => {
        setRoad(event.target.value);
    }

    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    }

    const handleFamilySituationChange = (event) => {
        setFamilySituation(event.target.value);
    }

    const handleDateOfBirth = (event) => {
        setBirthDate(event.target.value);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedUser = await updateUser(user.id, { first_name, last_name, email, role, account_status, nbr_child, phone, city, postal_code, country, road, newsletter, date_of_birth, nationality, family_situation});
            console.log('User updated successfully:', updatedUser);
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const updateUser = async (userId, userData) => {
        try {
            const response = await ky.put(`http://localhost:3000/user/${userId}`, {
                credentials: 'include',
                json: userData,
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    function deleteUser(id) {

        return ky.delete(`http://localhost:3000/user/${id}`, {
            credentials: "include",
        }).then((response) => {
            if (response.status === 200) {
                onClose();
            }
        });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg grid grid-cols-3 gap-4">
                <div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First
                            Name</label>
                        <input type="text" id="firstName" name="firstName" value={first_name}
                               onChange={handleFirstNameChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" name="status" value={account_status} onChange={handleStatusChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="ban">Ban</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" name="role" value={role} onChange={handleRoleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                            <option value="admin">Admin</option>
                            <option value="responsable">Responsable</option>
                            <option value="beneficiary">Beneficiary</option>
                            <option value="volunteer">Volunteer</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone
                            number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={phone}
                               onChange={handlePhoneNumberChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={last_name}
                               onChange={handleLastNameChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" id="city" name="city" value={city} onChange={handleCityChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal
                            Code</label>
                        <input type="text" id="postalCode" name="postalCode" value={postal_code}
                               onChange={handlePostalCodeChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="road" className="block text-sm font-medium text-gray-700">Road</label>
                        <input type="text" id="road" name="road" value={road} onChange={handleRoadChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" id="country" name="country" value={country} onChange={handleCountryChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of
                            Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={date_of_birth}
                               onChange={handleDateOfBirth}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                            Nationality</label>
                        <input type="text" id="nationality" name="nationality" value={nationality}
                               onChange={handleNationalityChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="familySituation" className="block text-sm font-medium text-gray-700">Family
                            Situation</label>
                        <select id="familySituation" name="familySituation"
                                value={family_situation}
                                onChange={handleFamilySituationChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                            <option value="">Select</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="childrens" className="block text-sm font-medium text-gray-700">Childrens</label>
                        <input type="number" id="childrens" name="childrens" value={nbr_child}
                               onChange={handleChildrensChange}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newsletter"
                               className="block text-sm font-medium text-gray-700">Newsletter</label>
                        <select id="newsletter" name="newsletter" value={(newsletter == 0) ? "false" : "true"}
                                onChange={handleNewsletterChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>


                </div>
                <div className="col-span-2 mt-8 content-center">
                    <form onSubmit={handleSubmit}>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Update</button>
                        <button type="button" onClick={onClose}
                                className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel
                        </button>
                        <button type="button" onClick={() => deleteUser(user.id)}
                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg">Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
