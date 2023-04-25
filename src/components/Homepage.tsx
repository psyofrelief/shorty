import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import shortenUrl from "../server/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.scss";
import { AuthContext } from "../AuthContext";

const Homepage = () => {
  interface Values {
    url: string;
    email: string;
    password: string;
  }

  interface Link {
    url: string;
    title: string;
  }

  interface UserData {
    username: string | null;
    links: Link[];
  }

  // Input values;
  const [values, setValues] = useState<Values>({
    url: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [linkError, setLinkError] = useState<Boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    links: [],
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const fetchUserData = async () => {
    await fetch("http://13.211.198.149/session_var.php", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const { is_logged_in, user_name, links } = data;
        const updatedLinks = JSON.parse(links) ? JSON.parse(links)[0] : null;
        if (is_logged_in) {
          login();
          setUserData({
            ...userData,
            username: user_name,
            links: updatedLinks,
          });

          // Store links and username in localStorage
          localStorage.setItem("links", JSON.stringify(updatedLinks));
          localStorage.setItem("username", user_name);
        } else {
          navigate("/");
        }
      });
  };

  const updateDBLinks = () => {
    fetch("http://13.211.198.149/update_user_data.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ links: userData.links }),
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const handleURL = (url: string) => {
    const linkTitle = values.url;
    const updatedLinks = userData.links ?? [];
    updatedLinks.push({ url: url, title: linkTitle });
    setUserData({ ...userData, links: updatedLinks });
  };

  const regex =
    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.[^\s]{2,}(?:\.[a-z]{2,4})?/;
  const isValidLink = (link: string) => regex.test(link);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidLink(values.url)) {
      setLinkError(true);
      return;
    }
    setIsLoading(true);
    shortenUrl(values.url, handleURL);
    setLinkError(false);
    setValues({ ...values, url: "" });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    const fetchAndSetUserData = async () => {
      const localStorageLinks = localStorage.getItem("links");
      const localStorageUsername = localStorage.getItem("username");
      // Check if user logged in and userData.links arr is empty;
      if (isLoggedIn && !localStorageLinks) {
        setIsLoading(false);
        await fetchUserData();
      } else {
        // Check if user is logged in and localstorage has links;
        if (isLoggedIn && localStorageLinks) {
          setUserData({
            username: localStorageUsername,
            links: JSON.parse(localStorageLinks),
          });
        }
      }
    };

    fetchAndSetUserData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("links", JSON.stringify(userData.links));
      if (userData.links) {
        updateDBLinks();
      }
    }, 1000);
  }, [userData]);

  const handleRemoveLink = (itemIndex: number) => {
    // prevUserData ensures I capture most recent userData;
    setUserData((prevUserData) => {
      const updatedLinks = prevUserData.links.filter(
        // _ is a placeholder for the value parameter;
        (_, index) => index !== itemIndex
      );

      return { ...prevUserData, links: updatedLinks };
    });
  };

  const mappedLinks = () => {
    return userData.links
      ? userData.links.map(
          (item: { url: string; title: string }, index: number) => {
            return (
              <div className="link" key={index}>
                <div className="link-info">
                  <p className="link-title">{item.title}</p>
                  <a className="link-url" href={item.url}>
                    {item.url}
                  </a>
                </div>
                <button
                  className="btn-remove-link"
                  onClick={() => handleRemoveLink(index)}
                  aria-label="button"
                >
                  <FontAwesomeIcon className="trash" icon={faTrash} />
                </button>
              </div>
            );
          }
        )
      : null;
  };

  return (
    <div className="Homepage">
      <Navbar isLoggedIn={isLoggedIn} />
      <main>
        <h1 className="welcome">
          Logged in as <span>{userData.username}</span>
        </h1>
        <Search
          handleChange={handleChange}
          value={values.url}
          handleSubmit={handleSubmit}
          linkError={linkError}
        />
        <h2>Your shortened links</h2>
        <div className="links-container">
          {mappedLinks()}{" "}
          {isLoading ? (
            <div className="loading-spinner">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Homepage;
