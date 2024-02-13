import { useContext } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.scss";
import { AuthContext } from "../AuthContext";

interface NavProps {
  isLoggedIn: string | null;
}
const Navbar: React.FC<NavProps> = ({ isLoggedIn }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to log out of account
  const logoutOfAccount = async () => {
    await fetch("http://13.211.198.149/logout.php", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.isLoggedIn) {
          logout();
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="Navbar">
      <div className="navbar-content">
        <p className="title">Shor.ty</p>
        <button
          className={isLoggedIn !== null ? "btn-logout" : "hidden"}
          onClick={logoutOfAccount}
          aria-label="button"
        >
          LOGOUT{" "}
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
