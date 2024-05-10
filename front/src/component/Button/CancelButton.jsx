const CancelButton = ({onClick, children}) => {
    return (
        <button className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg" onClick={onClick}>{children}</button>
    );
};

export default CancelButton;