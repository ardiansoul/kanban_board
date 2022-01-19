import React from "react";

interface Props {
  title: string;
}

const Navbar:React.FC<Props> = ({ title }) => {
  return (
    <div className="navbar">
      <h2 className="navbar title">{title}</h2>
    </div>
  );
};

export default Navbar;
