import Header from "../component/header/header.jsx";
import LogForm from "../component/logForm/logForm.jsx";

function LogPage(){
    return(
        <div>
            <Header/>
            <body>
            <main className="container mt-5">
                <LogForm/>
            </main>
            </body>

        </div>
    )
}

export default LogPage;