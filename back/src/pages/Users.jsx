import LightNavbar from "../components/LightNavbar/LightNavbar.jsx";
import UsersListing from "../components/UsersListing/UsersListing.jsx";

const Home = () => {
    return (
        <div className='d-flex'>
            <LightNavbar />
            <UsersListing />
        </div>
    );
};

export default Home;