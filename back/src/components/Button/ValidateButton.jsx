import React from 'react';

const ValidateButton = ({onClick, children}) => {
    return (
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg" onClick={onClick}>{children}</button>
    );
};

export default ValidateButton;