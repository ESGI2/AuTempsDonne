import LightNavbar from "../components/LightNavbar/LightNavbar.jsx";
import NewsletterForm from "../components/Newsletter/newsletter.jsx";

const NewsLetter = () => {
    return (
        <div className='d-flex'>
            <LightNavbar />
            <NewsletterForm/>
        </div>
    );
};

export default NewsLetter;