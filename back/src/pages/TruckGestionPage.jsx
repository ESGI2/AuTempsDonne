import LightNavbar from "../components/LightNavbar/LightNavbar.jsx";
import TruckGestion from "../components/TruckGestion/TruckGestion.jsx";

const TruckGestionPage = () => {
    return (
        <div className='d-flex'>
            <LightNavbar/>
            <TruckGestion/>
        </div>
    );
};

export default TruckGestionPage;