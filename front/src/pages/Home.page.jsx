import React from 'react';
import Home from "../component/home/home.jsx";
import Header from "../component/header/header.jsx";
import Footer from "../component/footer/footer.jsx";

function Homepage() {
    return (
        <>
            <Header/>
                <Home />
            <Footer />
        </>
    );
}

export default Homepage;
