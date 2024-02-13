import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import "../styles/authpage.scss";
import { AuthContext } from "../AuthContext.js";

const AuthPage = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  interface Values {
    username: string;
    password: string;
  }
  const [values, setValues] = useState<Values>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<Boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<Boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  // Navigation hook
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const resetValues = () => {
    setValues({
      username: "",
      password: "",
    });
  };

  // Function to validate form values
  const checkValueValidity = () => {
    const { username, password } = values;
    const regex = /^[^\s](?!.*\s$)[\w\d]*$/;

    if (username.length < 6 || password.length < 6) {
      setError(true);
      setErrorMessage(
        "Username & password must be greater than 6 characters each",
      );
      return false;
    }

    if (!regex.test(username) || !regex.test(password)) {
      setError(true);
      setErrorMessage(
        "Username and password must be in alphanumerical format with no whitespace",
      );
      return false;
    }

    setError(false);
    return true;
  };

  const signUpForAccount = async () => {
    if (!checkValueValidity()) {
      return;
    }
    await fetch("http://13.211.198.149/sign_up.php", {
      method: "POST",

      body: new URLSearchParams({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If user already exists;
        if (data.error) {
          setError(true);
          logout();
        } else {
          setError(false);
          setErrorMessage("");
          setSuccess(true);
          setSuccessMessage("Successfully signed up, please login.");
          setIsLoginPage(true);
          resetValues();
        }
      })
      .catch((error) => console.error(error));
  };

  // Function to log in to account
  const loginToAccount = async () => {
    if (!checkValueValidity()) {
      return;
    }
    await fetch("http://13.211.198.149/login.php", {
      method: "POST",

      body: new URLSearchParams({
        auth_type: "login",
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setErrorMessage(data.message);
          logout();
        } else {
          setError(false);
          setErrorMessage("");
          login();
          navigate("/dashboard");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission;
    const { username, password } = values;

    if (username.length < 6 || password.length < 6) {
      setError(true);
      setErrorMessage(
        "Username & password must be greater than 6 characters each",
      );
      return;
    }

    if (isLoginPage) {
      loginToAccount();
    } else {
      signUpForAccount();
    }
  };

  // Function to switch between login and sign up forms
  const handleIsLoginForm = (val: boolean) => {
    if (val) {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  };

  // Effect to reset success state and message when error changes
  useEffect(() => {
    if (error) {
      setSuccess(false);
      setSuccessMessage("");
    }
  }, [success]);

  return (
    <div className="Authpage">
      <Navbar isLoggedIn={isLoggedIn} />
      <main>
        <AuthForm
          error={error}
          errorMessage={errorMessage}
          success={success}
          successMessage={successMessage}
          values={values}
          handleChange={handleChange}
          handleIsLoginForm={handleIsLoginForm}
          isLoginPage={isLoginPage}
          handleSubmit={handleSubmit}
          signUpForAccount={signUpForAccount}
          loginToAccount={loginToAccount}
          resetValues={resetValues}
        />
      </main>{" "}
      <Footer />
    </div>
  );
};

export default AuthPage;
