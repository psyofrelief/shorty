import React from "react";

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Email = ({ value, handleChange }: Props) => {
  return (
    <input name="email" type="email" value={value} onChange={handleChange} />
  );
};

export default Email;
