import React from "react";

interface Props {
  value: string;
  linkError: Boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const Search = ({ value, handleChange, handleSubmit, linkError }: Props) => {
  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <label htmlFor="url" className="label-url">
        Enter <span>entire</span> URL that you wish to shorten
      </label>
      <div className="cont-input">
        {" "}
        <input
          name="url"
          type="search"
          value={value}
          placeholder="https://www.google.com"
          onChange={handleChange}
          className="inp-search"
        />
        <button className="btn-add-link" type="submit">
          +
        </button>
      </div>
      {linkError ? (
        <p className="link-error">
          Link invalid! Must be in http or https format.
        </p>
      ) : null}
    </form>
  );
};

export default Search;
