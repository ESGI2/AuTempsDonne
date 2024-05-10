const ClassicButton = ({onClick, children}) => {
    return (
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={onClick}>{children}</button>
    );
};

export default ClassicButton;