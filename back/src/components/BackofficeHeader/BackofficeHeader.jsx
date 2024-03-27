import logo from '../../assets/images/Icon ATD 50x50.svg';
import './BackofficeHeader.css';

const BackofficeHeader = () => {
    return (
        <div className="backoffice-header">
            <img src={logo} alt="logo" />
            <h1>AU TEMPS DONNÉ</h1>
        </div>
    );
};

export default BackofficeHeader;

