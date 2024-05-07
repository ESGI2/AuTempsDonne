import React from 'react';

const DeleteButton = ({onClick, children}) => {
    return (
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={onClick}>{children}</button>
    );
};

export default DeleteButton;