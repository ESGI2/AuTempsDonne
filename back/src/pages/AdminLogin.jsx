import LoginForm from "../components/LoginForm/LoginForm.jsx";
import BackofficeHeader from "../components/BackofficeHeader/BackofficeHeader.jsx";

export default function AdminLogin () {
    return(
        <div>
            <BackofficeHeader />
            <LoginForm />
        </div>
    );
}