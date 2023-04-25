import React from "react";

interface FormProps {
  error: Boolean | null;
  success: Boolean | null;
  errorMessage: string;
  successMessage: string;
  values: { username: string; password: string };
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  handleIsLoginForm: (val: boolean) => void;
  isLoginPage: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signUpForAccount: () => Promise<void>;
  loginToAccount: () => Promise<void>;
  resetValues: () => void;
}

const AuthForm: React.FC<FormProps> = ({
  error,
  success,
  errorMessage,
  successMessage,
  values,
  handleChange,
  handleSubmit,
  signUpForAccount,
  loginToAccount,
  resetValues,
  handleIsLoginForm,
  isLoginPage,
}) => {
  return (
    <form className="form-auth" onSubmit={handleSubmit}>
      <h1 className="intro-text">
        Welcome to Shor.ty, a URL shortener website!
        <span>To get started, please login or sign up below.</span>{" "}
      </h1>
      {success ? <h2 className="success-message">{successMessage}</h2> : null}
      {error ? <h2 className="error-message">{errorMessage}</h2> : null}
      <input
        name="username"
        type="text"
        value={values.username}
        onChange={handleChange}
        className="inp-username"
        maxLength={20}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        className="inp-password"
        maxLength={50}
        placeholder="Password"
      />
      {isLoginPage ? (
        <>
          <button
            className="btn-auth"
            onClick={loginToAccount}
            aria-label="button"
          >
            Log In
          </button>
          <p className="switch">
            Don't have an account?{" "}
            <span
              onClick={() => {
                handleIsLoginForm(false);
                resetValues();
              }}
            >
              Sign Up
            </span>
          </p>
        </>
      ) : (
        <>
          <button
            className="btn-auth"
            onClick={signUpForAccount}
            aria-label="button"
          >
            Sign Up
          </button>
          <p className="switch">
            Already have an account?{" "}
            <span
              onClick={() => {
                handleIsLoginForm(true);
                resetValues();
              }}
            >
              Log In
            </span>
          </p>
        </>
      )}
    </form>
  );
};

export default AuthForm;
