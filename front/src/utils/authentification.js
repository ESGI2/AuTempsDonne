import ky from "ky";

const checkCredentials = () => {
    return document.cookie.includes("jwt");
};
const AuthRoute = ({element}) => {
    if (checkCredentials()) {

        ky.get("http://autempsdonne.site:3000/user/me", {
            credentials: "include",
        }).then(async (response) => {
            if (response.status !== 200) {
                window.location.href = "/fr/login";
            } else {
                const data = await response.json();
                if (data.role === "volunteer" || data.role === "beneficiary") {
                    window.location.href = "/fr/main";
                }
            }
        });
        return element;
    } else {
        window.location.href = "/fr/login";
        console.log("Vous n'êtes pas connecté")
    }
    return checkCredentials() ? element : window.location.href = "/fr/login";
}


export default AuthRoute;