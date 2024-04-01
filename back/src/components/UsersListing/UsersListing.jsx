import ky from "ky";
import {useEffect, useState} from "react";
import Admin_img from "../../assets/images/Admin2.svg";
import Responsable_img from "../../assets/images/Responsable.svg";
import Beneficiary_img from "../../assets/images/Beneficiary.svg";
import Volunteer_img from "../../assets/images/Volunteer.svg";
import EditUserModal from "./EditUserModal.jsx";

const role = {
    admin : Admin_img,
    responsable : Responsable_img,
    beneficiary : Beneficiary_img,
    volunteer : Volunteer_img,
}

function getAllUsers() {
    return ky.get("http://localhost:3000/user", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

const UsersListing = () => {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data.users);
        });
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        updateUserList();
    };

    const updateUserList = () => {
        getAllUsers().then((data) => {
            setUsers(data.users);
        });
    };


    return (

        <div className="rounded-lg border border-gray-200">
            {showModal && <EditUserModal user={selectedUser} onClose={closeModal} onUpdateUser={updateUserList} />}
            <h1 className="text-2xl font-semibold text-gray-900 px-4 py-6 text-center">Users</h1>
            <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                        <th className="whitespace nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Register Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
                                <td className="whitespace nowrap px-4 py-2 font-medium text-gray-900">{user.first_name + " " +  user.last_name}</td>
                                <td className="whitespace nowrap px-4 py-2 text-gray-700">
                                    <img src={role[user.role]} alt={user.role} className="w-28" />
                                </td>
                                <td className="whitespace nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                <td className="whitespace nowrap px-4 py-2 text-gray-700">{user.registration_date}</td>
                                <td className="whitespace nowrap px-4 py-2 text-gray-700">{user.account_status}</td>
                                <td className="whitespace nowrap px-4 py-2 text-gray-700">
                                    <button onClick={() => openModal(user)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol className="flex justify-end gap-1 text-xs font-medium">
                    <li>
                        <a
                            href="#"
                            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            1
                        </a>
                    </li>

                    <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                        2
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            3
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                        >
                            4
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default UsersListing;