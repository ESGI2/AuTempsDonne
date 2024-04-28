import ky from "ky";
import {useEffect, useState} from "react";
import Admin_img from "../../assets/images/Admin2.svg";
import Responsable_img from "../../assets/images/Responsable.svg";
import Beneficiary_img from "../../assets/images/Beneficiary.svg";
import Volunteer_img from "../../assets/images/Volunteer.svg";
import EditUserModal from "./EditUserModal.jsx";
import NewUserModal from "./NewUserModal.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";

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
    const [showModal, setShowModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data.users);
        });
    }, []);

    const openModal = (user, modal) => {
        if (modal == "edit") {
            setSelectedUser(user);
            setShowModal("edit");
        } else if (modal == "new") {
            setShowModal("new");
        }
    };

    const closeModal = () => {
        setShowModal(null);
        updateUserList();
    };

    const updateUserList = () => {
        getAllUsers().then((data) => {
            setUsers(data.users);
        });
    };


    return (

        <div className="rounded-lg border border-gray-200 w-100">
            {(showModal === "edit") && <EditUserModal user={selectedUser} onClose={closeModal} />}
            {(showModal === "new") && <NewUserModal onClose={closeModal} />}
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
                                    <ClassicButton onClick={() => openModal(user, "edit")} text="Edit">Edit</ClassicButton>
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ClassicButton onClick={() => openModal(null, "new")} text="Add User">Add User</ClassicButton>
            </div>
        </div>
    );
}

export default UsersListing;