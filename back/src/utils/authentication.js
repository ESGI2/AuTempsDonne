import ky from "ky";

const checkCredentials = () => {
    return document.cookie.includes("jwt");
};
const AuthenticatedRoute = ({element}) => {
    if (checkCredentials()) {

        ky.get("http://autempsdonne.site:3000/user/me", {
            credentials: "include",
        }).then(async (response) => {
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                const data = await response.json();
                if (data.me.role !== "admin") {
                    window.location.href = "/";
                }
            }
        });
        return element;
    } else {
        window.location.href = "/";
        console.log("Vous n'êtes pas connecté")
    }
}


export default AuthenticatedRoute;
