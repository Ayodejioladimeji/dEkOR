import React from "react";

interface Props {
  title: string;
  text?: string;
}

const Heading = (props: Props) => {
  return (
    <>
      <h1 className="heading">{props?.title}</h1>
      <p className="header-paragraph">{props?.text}</p>
    </>
  );
};

export default Heading;
