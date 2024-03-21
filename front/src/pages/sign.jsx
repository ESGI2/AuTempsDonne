import Header from "../component/header/header.jsx";
import SignForm from "../component/registerForm/signForm.jsx";

function SignPage(){
    return(
        <div>
            <Header/>
            <body>
            <main className="container mt-5">
                <SignForm/>
            </main>
            </body>

        </div>
    )
}

export default SignPage;