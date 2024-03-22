import Header from "../component/header/header.jsx";
import Contact from "../component/contact/contactForm.jsx";
import Footer from "../component/footer/footer.jsx";

function SignPage(){
    return(
        <div>
            <Header/>
            <body>
            <main className="container mt-5">
                <h1 className="text-center">Contact</h1>
                <Contact/>
                <br/><br/><br/>
            </main>
            <Footer/>
            </body>

        </div>
    )
}

export default SignPage;